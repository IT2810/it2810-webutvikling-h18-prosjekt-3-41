import React, {Component} from 'react';
import { Text, View, StyleSheet, Animated, ActivityIndicator, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';
import MapScreenModal from '../components/mapScreenModal.js';




export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'Map',
    };
    constructor(props) {
      super(props);
      this.mapRef = null;
      this.state = {
          selectedMarker : null,
          heightAnimation   : new Animated.Value(0),
          opacityAnimation   : new Animated.Value(0),
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
      };


    onRegionChange(region) {
        this.setState({
          region
        });
    }


    renderMarkers() {
        return _.map(this.state.brothers, id => {
            if(id.name.includes(this.state.searchterm)) {
                return(
                    <Marker key={id.name}
                            identifier={id.name}
                            coordinate={id.latlng}
                            title={id.name}
                            image={require('../assets/customMarker.png')}
                            onDeselect={this.closeModal.bind(this)}
                            onSelect={e => this.openModal(e.nativeEvent.coordinate)}
                            onPress={(e) => console.log(e.nativeEvent.id)}
                    />
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
                        ref={(ref) => { this.mapRef = ref }}
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
                    <Marker pinColor='blue'
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

    openModal(coord){
      this.setState({region: coord})
      Animated.parallel([
        Animated.timing(
          this.state.heightAnimation,
          {
              toValue: 300,
              duration: 300,
          }
      ),
      Animated.timing(
        this.state.opacityAnimation,
        {
            toValue: 1,
            duration: 300,
        }
    )]).start();
    console.log(this.state.selectedMarker)
    }

    closeModal(){
      Animated.parallel([
        Animated.timing(
          this.state.heightAnimation,
          {
              toValue: 0,
              duration: 300,
          }
      ),
      Animated.timing(
        this.state.opacityAnimation,
        {
            toValue: 0,
            duration: 300,
        }
    )]).start();

    }

    render() {
        const { navigfates } = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.headerView}>
                <Text style={styles.headerText}>SNUSBROTHERS</Text>
              </View>
              {this.renderMap()}
              <Animated.View style={[styles.modal,{height: this.state.heightAnimation, opacity: this.state.opacityAnimation}]}>
                <MapScreenModal handleClose={this.closeModal.bind(this)} />
              </Animated.View>
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
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
  },
  headerView: {
        position: 'absolute',
        top:0,
        left:0,
        right:0,
        zIndex: 3,
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
