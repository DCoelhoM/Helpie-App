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

var RequestsMenuPage = require('./RequestsMenuPage.js');

class NearbyRequestsPage extends Component {
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
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }
  render () {
    return (
      <View style={styles.container} scrollEnabled={false}>
      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />
      <Text>
      {this.state.initialPosition}
      </Text>
      <MapView
      style={{height: 200, width: 200}}
      showsUserLocation={true}
      />

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

module.exports = NearbyRequestsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  back: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
});
