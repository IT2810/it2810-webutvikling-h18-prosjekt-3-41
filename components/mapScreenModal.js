import React, {Component} from 'react';
import {Text, Button, TouchableHighlight, Picker, DatePickerIOS, View, StyleSheet} from 'react-native';


class MapScreenModal extends Component {
  state = {
    chosenDate: new Date(),
    snusType: 'GENERAL',
    antallSnus: '1'
  };

  setDate(newDate) {
    this.setState({chosenDate: newDate,})
  }

  handleBomSnus(){
    console.log('dato: ' + this.state.chosenDate)
    console.log('type: ' + this.state.snusType)
    console.log('antall: ' + this.state.antallSnus)
  }

  render() {
    return (
          <View style={styles.modal}>

            <Text style={{textAlign: 'center', color: '#fdfcaa', fontSize:20, marginTop: 15}}>GENERAL LOVER</Text>
            <Text style={{textAlign: 'center'}}>Type:                 Antall:                                  Dato:                            </Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Picker
                selectedValue={this.state.snusType}
                style={{ width: 100 }}
                onValueChange={(itemValue, itemIndex) => this.setState({snusType: itemValue})}>
                <Picker.Item label="SKRUFF" value="SKRUFF" />
                <Picker.Item label="GENERAL" value="GENERAL" />
                <Picker.Item label="06" value="06" />
                <Picker.Item label="MOKKA" value="MOKKA" />
              </Picker>

              <Picker
                selectedValue={this.state.antallSnus}
                style={{ width: 100 }}
                onValueChange={(itemValue, itemIndex) => this.setState({antallSnus: itemValue})}>
                <Picker.Item label="0" value='0' />
                <Picker.Item label="1" value='1' />
                <Picker.Item label="2" value='2' />
                <Picker.Item label="3" value='3' />
                <Picker.Item label="4" value='4' />
                <Picker.Item label="5" value='5' />
                <Picker.Item label="6" value='6' />
                <Picker.Item label="7" value='7' />
                <Picker.Item label="8" value='8' />
                <Picker.Item label="9" value='9' />
                <Picker.Item label="10" value='10' />
              </Picker>

              <DatePickerIOS
                style={{width: 200}}
                date={this.state.chosenDate}
                onDateChange={this.setDate.bind(this)}
              />
            </View>
            <View style={{backgroundColor: '#fdfcaa', borderRadius:4, width:150, alignSelf: 'center', marginBottom:5}}>
              <Button title='BOM SNUS' color='#95abaf' onPress={this.handleBomSnus.bind(this)}/>
            </View>



          </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    height: 300,
    backgroundColor: '#95abaf',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.95
  },
});


export default MapScreenModal
