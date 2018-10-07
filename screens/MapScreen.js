import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';

export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'Map',
    };

    constructor(props) {
      super(props);
      this.state = {
          brothers: {
              1: {
                  brother: 'General lover',
                  latlng: {
                      latitude: 63.4157,
                      longitude: 10.4061
                  }
              },
              2: {
                  brother: 'Skruf lover',
                  latlng:{
                      latitude: 63.43,
                      longitude: 10.5
                  }
              }
          }
      };
    }

    onRegionChange(region) {
    this.setState({
      region
    });
    }

    renderMarkers() { 
        return _.map(this.state.brothers, id => {

            return(
                <Marker key={id.brother}
                    coordinate={id.latlng}
                    title={id.brother}/>
            )});
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <MapView style={styles.map}
                        initialRegion={{
                          latitude: 63.418546,
                          longitude: 10.402860,
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        region ={this.state.region}
                        onRegionChangeComplete={this.onRegionChange.bind(this)}
                        rotateEnabled={false}>
                  {this.renderMarkers()}
              </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
