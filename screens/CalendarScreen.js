import React, {Component} from 'react';
import { Text, View , Button} from 'react-native';
import { CalendarList } from 'react-native-calendars';


export default class CalendarScreen extends Component {

    static navigationOptions = {
        title: 'Calendar',
    };

    constructor(props) {
        super(props);

        this.state  = {
            selectedDate : {}
        }
    }

    selectDay(day){
        let res = {};
        res[day.dateString] = {selected: true, selectedColor: 'lightblue'};
        this.setState({selectedDate : res});
        // Then open Agenda and send current data state
        this.props.navigation.navigate('Agenda', {
            selectedDate: day
        });
    }

    render() {
        // State from the navigation
        const { navigate } = this.props.navigation;


        return (
            <View>
                <CalendarList
                    // Callback which gets executed when visible months change in scroll view. Default = undefined
                    onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={50}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={50}
                    // Enable or disable scrolling of calendar list
                    scrollEnabled={true}
                    // Enable or disable vertical scroll indicator. Default = false
                    showScrollIndicator={true}
                    // When pressing a date it turns lightblue
                    markedDates={this.state.selectedDate}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2016-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2020-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => this.selectDay(day)}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Specify theme properties to override specific styles for calendar parts. Default = {}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: 'black',
                        textMonthFontWeight: 'bold',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 12
                    }}

            />
            </View>
        );
    }
}

