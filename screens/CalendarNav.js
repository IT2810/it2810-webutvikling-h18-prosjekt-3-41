import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CalendarScreen from "./CalendarScreen";
import AgendaScreen from "./AgendaScreen";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

// This file is made for navigation between Calendar and Agenda
export default createStackNavigator({
    Cal: {
        screen: CalendarScreen
    },
    Agenda: {
        screen: AgendaScreen
    }
},
    // Settings for TabNavigator
    {
        initialRouteName: 'Cal',
        navigationOptions: ({ navigation }) => ({
            header: (
                <View style={styles.headerView}>
                    <Text style={styles.headerText}>SNUSBROTHERS</Text>
                </View>
            ),
        }),
    });

const styles = StyleSheet.create({
    headerView: {
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: "#95abaf"
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        color: "#fdfcaa"
    }
});