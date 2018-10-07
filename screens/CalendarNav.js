import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CalendarScreen from "./CalendarScreen";
import AgendaScreen from "./AgendaScreen";

// This file is made for navigation between Calendar and Agenda
export default createStackNavigator({
    Cal: {
        screen: CalendarScreen
    },
    Agenda: {
        screen: AgendaScreen
    }
});