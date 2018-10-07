import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import MapScreenModal from '../components/mapScreenModal.js'

export default class MapScreen extends Component {

    static navigationOptions = {
        title: 'Map',
    };

    constructor(props) {
      super(props);
      this.state = {
        modalVisible: true,
      };
      }

    onRegionChange(region) {
    this.setState({
      region
    });
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    closeModal(){
      this.setState({modalVisible: false});
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
