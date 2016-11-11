import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
  TextInput,
  Alert,
  MapView
} from 'react-native';

var LocationsMenuPage = require('./LocationsMenuPage.js');

class NewLocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {initialPosition: 'unknown'};
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});

      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}

    );
  }
  _save () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LocationsMenuPage'});
  }
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LocationsMenuPage'});
  }
  render () {
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._loc = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Location Name'
      maxLength={16}
      onChangeText={(text) => this.setState({email: text})}
      />
      </View>

      <MapView
      style={{height: 200, width: 200}}
      showsUserLocation={true}
      />

      <View style={styles.save}>
      <Button
      color='#3197d6ff'
      onPress={this._save.bind(this)}
      title="Save"
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
    );
  }
}

module.exports = NewLocationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  inputContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
  },
  save: {
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
