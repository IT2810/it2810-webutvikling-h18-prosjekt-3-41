import React, {Component} from 'react';
import {Text, TouchableHighlight, View, StyleSheet} from 'react-native';

class MapScreenModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }


  render() {
    return (
          <View style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 300,
                backgroundColor: 'lightgrey'}}

                >
            <TouchableHighlight
              onPress={() => this.props.handleClose()}
              >
              <Text>close</Text>
            </TouchableHighlight>
          </View>
    );
  }
}

export default MapScreenModal
