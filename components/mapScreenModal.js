import React, {Component} from 'react';
import {Text, Button, TouchableHighlight, Picker, DatePickerIOS, DatePickerAndroid, View, StyleSheet, Platform} from 'react-native';


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

  async renderAndroidPicker () {
      const { action, year, month, day } = await DatePickerAndroid.open({
          date: new Date()
      });

      if (action === DatePickerAndroid.dismissedAction) {
          return;
      }
      let newDate = new Date(year, month, day);
      this.setState({
          chosenDate: newDate,
      });
  }

  renderDatePicker() {
    if(Platform.OS === 'ios'){
        return(
            <DatePickerIOS
            style={{width: 200}}
            date={this.state.chosenDate}
            onDateChange={this.setDate.bind(this)}
        />)
    }
    else {
      return(
          <Button title={"Get date"} onPress={this.renderAndroidPicker.bind(this)}/>
      )
    }
  }

  render() {
    return (
          <View style={styles.modal}>
            <Text style={{textAlign: 'center', color: '#fdfcaa', fontSize:20, marginTop: 15}}>GENERAL LOVER</Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex:0.4, flexDirection: 'column',  alignItems:'center', justifyContent:'flex-start'}}>
                <Text style={{textAlign: 'center', marginBottom:15}}>Type</Text>
                <Picker
                    selectedValue={this.state.snusType}
                    style={{ width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({snusType: itemValue})}>
                    <Picker.Item label="SKRUFF" value="SKRUFF" />
                    <Picker.Item label="GENERAL" value="GENERAL" />
                    <Picker.Item label="06" value="06" />
                    <Picker.Item label="MOKKA" value="MOKKA" />
                </Picker>
              </View>
              <View style={{flex: 0.3, flexDirection: 'column', alignItems:'center', justifyContent: 'flex-start'}}>
                <Text style={{textAlign:'center', marginBottom:15}}>Antall</Text>
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
              </View>
              <View style={{flex: 0.3, flexDirection: 'column', alignItems:'center', justifyContent:'flex-start'}}>
                <Text style={{textAlign:'center', marginBottom:15}}>Dato</Text>
                {this.renderDatePicker()}
              </View>

            </View>
            <View style={{backgroundColor: '#fdfcaa', borderRadius:4, width:150, alignSelf: 'center', marginBottom:5}}>
              <Button style={{marginBottom: 5}} title='BOM SNUS' color='#95abaf' onPress={this.handleBomSnus.bind(this)}/>
            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#a0b4b7',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.95
  },
});


export default MapScreenModal
