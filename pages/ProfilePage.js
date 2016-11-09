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
  Alert
} from 'react-native';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={{width:108 ,height: 136}}
          source={require('../img/logowhite.png')}
        />
        <Text>
        {this.props.email}
        </Text>
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
