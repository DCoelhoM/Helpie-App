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

var CreateRequestPage = require('./CreateRequestPage.js');
var NearbyRequestsPage = require('./NearbyRequestsPage.js');
var MyRequestsPage = require('./MyRequestsPage.js');

class RequestsMenuPage extends Component {
  constructor(props) {
    super(props);
  }

  _createrq () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'CreateRequestPage'});
  }

  _nearbyrq () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'NearbyRequestsPage'});
  }

  _myrq () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'MyRequestsPage'});
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
      onPress={this._createrq.bind(this)}
      title="Create Request"
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._nearbyrq.bind(this)}
      title="Nearby Requests"
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this._myrq.bind(this)}
      title="My Requests"
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

module.exports = RequestsMenuPage;

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
