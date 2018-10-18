import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import {Agenda} from 'react-native-calendars';
import _ from 'lodash';

export default class AgendaScreen extends Component {

    static navigationOptions = {
        title: 'Agenda',
    };

    constructor(props) {
        super();
        this.state = {
            items: {
                // Just Example of use. We need to load appointments from AsyncStorage
                "2018-10-14": [
                    {
                        "height": 127,
                        "name" : "Item for 2018-10-10 selv",
                        "snus" : "General",
                        "antall": "10"
                    }
                ],
                // An empty date has to be like this:
                "2018-10-11": []
            },
            addedItems: {}
        };
    }

    render() {
        // We can send params from between the screens in the TabNavigator
        const { navigation } = this.props;

        return (
            <Agenda
                // A week start from Monday(1)
                firstDay={1}
                // See example of item structure over
                items={this.state.addedItems}
                // Callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={this.loadItems.bind(this)}
                // Selected date on startup - Should me today
                selected={new Date()}
                // Specify how each item should be rendered in agenda
                renderItem={this.renderItem.bind(this)}
                // Specify how empty date content with no items should be rendered
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                // Specify your item comparison function for increased performance
                rowHasChanged={this.rowHasChanged.bind(this)}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                    selectedDayBackgroundColor: "lightblue",
                    agendaDayTextColor: 'black',
                    agendaDayNumColor: 'lightblue',
                    agendaTodayColor: 'red',
                    agendaKnobColor: 'lightblue',
                    todayTextColor: 'red',
                }}
            />
        );
    }

    componentDidMount() {
        let appointments = null;
        let newItems = this.state.items;
        AsyncStorage.getItem('appointments').
            then(items => {
                if(items) {
                    appointments = JSON.parse(items);
                }else {
                    appointments = require('../assets/preloadedappointments');
                    AsyncStorage.setItem('appointments', JSON.stringify(appointments));
                }
        }).
            then(() => {
                _.map(appointments, appointment => {
                    Object.keys(appointment).forEach(key => {
                        if(!this.state.items[key]){
                            newItems[key] = appointment[key]
                        }else {
                            newItems[key] = [...this.state.items[key], ...appointment[key]];
                        }
                    });
                });
            this.setState({
                items: newItems
            })
        })
    }

    // Loads random items for the agenda.
    // Here we should load saved appointments and if no appointment make an empty day
    loadItems(day) {
        setTimeout(() => {
            for(let i = 0; i < 31; i++){
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                if(!this.state.items[strTime]) {
                    this.state.addedItems[strTime] = []
                }
                if(!this.state.addedItems[strTime]) {
                    this.state.addedItems[strTime] = this.state.items[strTime]
                }
            }



            const newItems = {};
            Object.keys(this.state.addedItems).forEach(key => {newItems[key] = this.state.addedItems[key];});
            this.setState({
                addedItems: newItems
            });
        }, 1000);

    }

    // How should one item on one day look like
    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}>
                <Text>{item.name}</Text>
                <Text>{item.snus}</Text>
                <Text>{item.antall}</Text>
            </View>
        );
    }

    // Days with no appointments should just be an empty view
    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}></View>
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