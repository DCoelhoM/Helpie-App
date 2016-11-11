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

var LocationsMenuPage = require('./LocationsMenuPage.js');

class MyLocationsPage extends Component {
  constructor(props) {
    super(props);
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

module.exports = MyLocationsPage;

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
