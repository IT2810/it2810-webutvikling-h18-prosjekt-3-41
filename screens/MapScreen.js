import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapScreenModal from '../components/mapScreenModal.js';
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
          },
        modalVisible: false
      };
    }


    renderMarkers() {
        return _.map(this.state.brothers, id => {

            return(
                <Marker key={id.brother}
                    coordinate={id.latlng}
                    title={id.brother}
                    onSelect={this.openModal.bind(this)}
                    onDeselect={this.closeModal.bind(this)}
                    onPress={e => this.setState({
                      region: e.nativeEvent.coordinate
                    })}
                  />

            )});
    }


    onRegionChange(region) {
    this.setState({
      region
    });
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
                        rotateEnabled={false}
              >
                {this.renderMarkers()}
              </MapView>
              {this.getMapModal()}
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
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
