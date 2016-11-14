import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  Image,
  Button,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';

var RequestsMenuPage = require('./RequestsMenuPage.js');

class CreateRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', locations: [], title: '', description: '', deadline: new Date(), loc_id: ''}
  } componentWillMount() {
    try {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({id: value});
        this.getuserlocations();
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  getuserlocations(){
    try {
      response = fetch('http://138.68.146.193:5000/mylocations', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.id,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (parseInt(responseJson.state) == 1){
          locations_name = [];
          responseJson.locations.forEach((location) => {
            loc = {id: location.id,name: location.name};
            locations_name.push(location.name);
          });
          console.log(locations_name);
          this.setState({locations: locations_name});
          //TODO
        } else {
          Alert.alert('No locations found');
        }
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.locations != nextState.locations){
      return true;
    }
    return false;
  }

  onDateChange = (date) => {
    this.setState({deadline: date});
  };

  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }
  render () {
    return (
      <ScrollView  ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.container2}>
      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._title = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Title'
      maxLength={32}
      onChangeText={(text) => this.setState({name: text})}
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._desc = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Description'
      maxLength={256}
      onChangeText={(text) => this.setState({name: text})}
      />
      </View>

      <View style={styles.select}>
      <ModalDropdown
      options={this.state.locations}
      textStyle={styles.dropdowntext}
      dropdownStyle={styles.dropdown}
      />
      </View>

      <View style={styles.date_input}>
      <DatePicker
      style={{width: 200}}
      date={this.state.deadline}
      mode="datetime"
      placeholder="Deadline"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={(date) => {this.setState({deadline: date})}}
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._back.bind(this)}
      title="Create Request"
      />
      </View>

      <View style={styles.back}>
      <Button
      color='#3197d6ff'
      onPress={this._back.bind(this)}
      title="Back"
      />
      </View>
      </View>
      </ScrollView>
    );
  }
}

module.exports = CreateRequestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3197d6ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#3197d6ff',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  inputContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  input: {
    width: 200,
    height: 40,
  },
  select: {
    marginTop: 20,
    width: 200,
  },
  dropdown: {
    width: 200,
  },
  dropdowntext: {
    color: '#FFF',
  },
  date_input: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  btn: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  back: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
});
