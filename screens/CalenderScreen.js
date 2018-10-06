import React, {Component} from 'react';
import { Text, View } from 'react-native';
import {Ionicons} from "@expo/vector-icons";

export default class CalenderScreen extends Component {

    static navigationOptions = {
        title: 'Calender',
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    CalenderScreen
                </Text>
                <Ionicons name={"md-calendar"} size={32} color="black" />
            </View>
        );
    }
}

