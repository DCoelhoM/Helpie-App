import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
} from 'react-native';

var LoginPage = require('./LoginPage.js');

class SplashPage extends Component {
  componentWillMount () {
    var navigator = this.props.navigator;
    setTimeout (() => {
      navigator.replace({
        id: 'LoginPage',
      });
    }, 2000);
  }

  render () {
    return (
      <View style={styles.container}>
      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />
      <Text style={styles.appname}>
      {'\nHelpie'}
      </Text>
      <Text style={styles.version}>
      {'Version 0.1'}
      </Text>

      </View>
    );
  }
}

module.exports = SplashPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff'
  },
  appname: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  version: {
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
