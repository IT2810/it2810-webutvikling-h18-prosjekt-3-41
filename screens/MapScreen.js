import React, {Component} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
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
                  name: 'General lover',
                  latlng: {
                      latitude: 63.4157,
                      longitude: 10.4061
                  }
              },
              2: {
                  name: 'Skruf lover',
                  latlng:{
                      latitude: 63.43,
                      longitude: 10.46
                  }
              },
              3: {
                  name: 'Georg',
                  latlng:{
                      latitude: 63.4,
                      longitude: 10.49
                  }
              },
              4: {
                  name: '02',
                  latlng:{
                      latitude: 63.43,
                      longitude: 10.5
                  }
              }
          },
          myposition: {
              latitude: null,
              longitude: null
          },
          searchterm: ''
      }
    }


    onRegionChange(region) {
        this.setState({
          region
        });
    }


    renderMarkers() { 
        return _.map(this.state.brothers, id => {
            if(id.name.includes(this.state.searchterm)) {
                return(
                    <Marker key={id.name}
                            coordinate={id.latlng}
                            title={id.name}/>
                )
            }
        });
    }

    renderMap(){
        if((!this.state.myposition.latitude)||(!this.state.myposition.longitude)){
            return(
                <ActivityIndicator size="large" color="#0000ff"/>
            );
        }
        else {
            return(
                <MapView style={styles.map}
                         initialRegion={{
                             latitude: this.state.myposition.latitude,
                             longitude: this.state.myposition.longitude,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                         }}
                         region ={this.state.region}
                         onRegionChangeComplete={this.onRegionChange.bind(this)}
                         rotateEnabled={false}>
                    {this.renderMarkers()}
                    <Marker image={require('../assets/android-locate.png')}
                            coordinate={this.state.myposition}
                            title={"Me"}/>
                </MapView>
            )
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    myposition: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                });
            },
            error => (console.log(error)));
    }





    render() {
        const { navigfates } = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.renderMap()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  map: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


