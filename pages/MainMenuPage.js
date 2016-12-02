import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
  AsyncStorage,
} from 'react-native';

var LoginPage = require('./LoginPage.js');

var ProfilePage = require('./ProfilePage.js');
var RequestsMenuPage = require('./RequestsMenuPage.js');
var LocationsMenuPage = require('./LocationsMenuPage.js');

class MainMenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', name: '', email: ''};
  }
  componentWillMount(){
    try {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({'id': value});
      }).done();
      AsyncStorage.getItem('name').then((value) => {
        this.setState({'name': value});
      }).done();
      AsyncStorage.getItem('email').then((value) => {
        this.setState({'email': value});
      }).done();
    }catch(error) {
      console.error(error);
    }
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
    try {
      AsyncStorage.removeItem('login');
      AsyncStorage.removeItem('id');
      AsyncStorage.removeItem('name');
      AsyncStorage.removeItem('email');
    } catch (error) {
      console.log(error);
    }
  }
  render () {
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <Text>
      {this.state.email}
      </Text>

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

      <View style={styles.logout}>
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
