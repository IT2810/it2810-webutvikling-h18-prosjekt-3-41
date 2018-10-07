import React, {Component} from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
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
        modalVisible: false
      };
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
                            title={id.name}
                            onSelect={this.openModal.bind(this)}
                            onDeselect={this.closeModal.bind(this)}
                            onPress={e => this.setState({
                              region: e.nativeEvent.coordinate
                    })}/>
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

    openModal(){
      this.setState({modalVisible: true});
    }

    closeModal(){
      this.setState({modalVisible: false});
    }

    onMarkerPress(coord){
      console.log(coord)
    }

    getMapModal(){
      if (this.state.modalVisible){
        return(
          <View style={styles.modal}>
            <MapScreenModal handleClose={this.closeModal.bind(this)} />
          </View>
        );
      }else{
        return(null);
      }

    }

    render() {
        const { navigfates } = this.props.navigation;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.renderMap()}
              <View style={styles.headerView}>
                <Text style={styles.headerText}>SNUSBROTHERS</Text>
              </View>
              {this.renderMap()}
              {this.getMapModal()}
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


