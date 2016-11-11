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

var LoginPage = require('./LoginPage.js');

var ProfilePage = require('./ProfilePage.js');
var RequestsMenuPage = require('./RequestsMenuPage.js');
var LocationsMenuPage = require('./LocationsMenuPage.js');

class MainMenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {initialPosition: 'unknown'};
  }

  _profile () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'ProfilePage'});
  }

  _requests () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }

  _locations () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LocationsMenuPage'});
  }
  _logout () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LoginPage'});
  }
  render () {
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._profile.bind(this)}
      title="Profile"
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._requests.bind(this)}
      title="Requests"
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._locations.bind(this)}
      title="Locations"
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._logout.bind(this)}
      title="Logout"
      />
      </View>

      </View>
    );
  }
}

module.exports = MainMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  btn: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  logout: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
});
