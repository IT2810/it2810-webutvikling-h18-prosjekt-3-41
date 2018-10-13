import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, Animated, ActivityIndicator, TextInput, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';
import MapScreenModal from '../components/mapScreenModal.js';


const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

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
                      latitude: 63.41927,
                      longitude: 10.40206
                  },
                  snus: ['Skruf', 'General', 'Mokka']
              },
              2: {
                  name: 'Skruf lover',
                  latlng:{
                      latitude: 63.43,
                      longitude: 10.46
                  },
                  snus: ['Hubba bubba', 'Thunder', 'O6']
              },
              3: {
                  name: 'Georg',
                  latlng:{
                      latitude: 63.4,
                      longitude: 10.49
                  },
                  snus: ['Mokka', 'Skruf', 'O2', 'General']
              },
              4: {
                  name: '02',
                  latlng:{
                      latitude: 63.43,
                      longitude: 10.5
                  },
                  snus: ['Skruf', 'General', 'Nick and johnny']
              }
          },
          myposition: {
              latitude: null,
              longitude: null
          },
          searchterm: '',
          modalOpen: false,
          currentBrother: {
              name: 'General lover',
              latlng: {
                  latitude: 63.41927,
                  longitude: 10.40206
              },
              snus: ['Skruf', 'General', 'Mokka']
          }
      }
    };


    onRegionChangeComplete(region) {

        this.setState({
          region
        });
    }

    renderMarkers() {
      if(Platform.OS === 'ios'){
        return _.map(this.state.brothers, id => {
            if(id.name.includes(this.state.searchterm)) {
                return(
                    <Marker key={id.name}
                            identifier={id.name}
                            coordinate={id.latlng}
                            title={id.name}
                            image={require('../assets/customMarkerIOS.png')}
                            onDeselect={this.closeModal.bind(this)}
                            onSelect={e => this.openModal(e.nativeEvent.coordinate)}
                            onPress={this.setState({
                                currentBrother: id
                            })}
                    />
                )
            }
          });
        }else{
          return _.map(this.state.brothers, id => {
              if(id.name.includes(this.state.searchterm)) {
                  return(
                      <Marker key={id.name}
                              identifier={id.name}
                              coordinate={id.latlng}
                              title={id.name}
                              image={require('../assets/customMarker.png')}
                              onPress={(e) => {

                                  this.openModal(e.nativeEvent.coordinate, id)
                                }
                              }
                      />
                  )
              }
            });
        }
    }

    renderMap(){
        if((!this.state.myposition.latitude)||(!this.state.myposition.longitude)){
            return(
                <ActivityIndicator size="large" color="#0000ff"/>
            );
        }
        else {
            return(
                <MapView
                        style={styles.map}
                        ref={(ref) => { this.mapRef = ref }}
                        initialRegion={{
                             latitude: this.state.myposition.latitude,
                             longitude: this.state.myposition.longitude,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                        }}
                        region={this.state.region}
                        onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
                        rotateEnabled={false}>
                    {this.renderMarkers()}
                    <Marker image={require('../assets/appuserMarker.png')}
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

    openModal(coord, brother){

      this.mapRef.animateToCoordinate(coord);
      setTimeout(() => {
        this.setState({
            currentBrother: brother,
            region: {
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

        });
      }, 700);
      Animated.parallel([
        Animated.timing(
          this.state.heightAnimation,
          {
              toValue: Platform.OS === 'ios' ? 300 : 175,
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
    }

    closeModal(){
      console.log('closing')
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
        console.log(this.state.region);
        const { navigfatee } = this.props.navigation;
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.headerView}>
                <View style={{marginLeft: 10, flex: 0.2,}}>
                  <Image source={require('../assets/headerLogo.png')}/>
                </View>
                <TextInput
                  style={{ flex: 0.7, paddingLeft: 10, marginLeft: 10, height: 40, borderColor: 'gray', borderWidth: 1, borderRadius:5, backgroundColor: 'white'}}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => this.setState({searchterm: text})}
                  placeholder='Search for snusbrother'
                />
              </View>
              <TouchableWithoutFeedback
                  onPress={this.closeModal.bind(this)}
                  accessible={false}>
                {this.renderMap()}
              </TouchableWithoutFeedback>
              <Animated.View style={[styles.modal,{height: this.state.heightAnimation, opacity: this.state.opacityAnimation}]}>
                <MapScreenModal brother={this.state.currentBrother}/>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
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
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#95abaf"
    },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    color: "#fdfcaa"
    }
});
