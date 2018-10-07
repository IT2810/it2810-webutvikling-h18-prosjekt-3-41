import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {
                // Just Example of use. We need to load appointments from AsyncStorage
                "2018-10-10": [
                    {
                        "height": 127,
                        "name" : "Item for 2018-10-10"
                    }
                ],
                // An empty date has to be like this:
                "2018-10-11": []
            }
        };
    }

    render() {
        // Get the data CalendarScreen sends through navigation
        const { navigation } = this.props;
        const markedDate = navigation.getParam('selectedDate', '2018-01-01');

        return (
            <Agenda
                firstDay={1}
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                selected={markedDate}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    selectedDayBackgroundColor: "lightblue"
                }}
            />
        );
    }

    // Loads random items for the agenda.
    // Here we should load saved appointments and if no appointment make an empty day
    loadItems(day) {
        setTimeout(() => {
            for (let i = 0; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 5);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            console.log(this.state.items);
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
            this.setState({
                items: newItems
            });
        }, 1000);
        // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});