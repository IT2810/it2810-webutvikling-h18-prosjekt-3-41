import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'Map',
    };



    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    MAPSCREEN
                </Text>
                <Ionicons name="md-map" size={32} color="black" />
            </View>
        );
    }
}

