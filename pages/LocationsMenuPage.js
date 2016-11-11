import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
} from 'react-native';

var MainMenuPage = require('./MainMenuPage.js');

var NewLocationPage = require('./NewLocationPage.js');
var MyLocationsPage = require('./MyLocationsPage.js');

class LocationsMenuPage extends Component {
  constructor(props) {
    super(props);
  }

  _saveloc () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'NewLocationPage'});
  }

  _myloc () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'MyLocationsPage'});
  }
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'MainMenuPage'});
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
      onPress={this._saveloc.bind(this)}
      title="Save Location"
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._myloc.bind(this)}
      title="My Locations"
      />
      </View>

      <View style={styles.btn}>
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

module.exports = LocationsMenuPage;

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
  back: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
});
