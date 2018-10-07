import React from 'react';
import { createStackNavigator  } from 'react-navigation';
import CalenderScreen from "./CalenderScreen";
import AgendaScreen from "./AgendaScreen";

// This file is made for navigation between Calendar and Agenda
export default createStackNavigator({
    Cal: {
        screen: CalenderScreen
    },
    Agenda: {
        screen: AgendaScreen
    }
});