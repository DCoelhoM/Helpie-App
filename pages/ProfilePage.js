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
class ProfilePage extends Component {
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
      navigator.replace({id: 'LoginPage'});
  }
  render () {
    return (
      <View style={styles.container}>
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
        <Button
          onPress={this._back.bind(this)}
          title='Back'
        />
      </View>
    );
  }
}

module.exports = ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  appname: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  version: {
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
