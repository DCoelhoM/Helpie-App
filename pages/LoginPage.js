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

var RegisterPage = require('./RegisterPage.js');
var ProfilePage = require('./ProfilePage.js');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''  }; 
  }
  _signin () {
    var navigator = this.props.navigator;
    navigator.email = this.state.email;
    navigator.replace({id: 'ProfilePage'});
  }
  _signup (){
    var navigator = this.props.navigator;
    navigator.replace({id: 'RegisterPage'});
  }
  render () {
    return (
      <View style={styles.container}>
        <Image
          style={{width:108 ,height: 136}}
          source={require('../img/logowhite.png')}
        />

        <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          autoCapitalize={'none'}
          placeholder='E-mail'
          maxLength={32}
          onChangeText={(text) => this.setState({email: text})}
        />
        </View>

        <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          onChangeText={(text) => this.setState({password: text})}
        />
        </View>

        <View style={styles.btn}>
        <View style={styles.signin}>
        <Button 
          onPress={this._signin.bind(this)}
          title="Sign In"
        />
        </View>
        <View style={styles.signup}>
        <Button 
          onPress={this._signup.bind(this)}
          title="Sign Up"
        />
        </View>
        </View>
      </View>
    );
  }
}

module.exports = LoginPage;

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
  inputContainer: {
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#CCC',
  },
  input: {
      width: 200,
      height: 40,
  },
  btn: {
      marginTop: 10,
      flexDirection: 'row',
      height: 40,
  },
    signin: {
        backgroundColor: '#FFF',
        marginRight: 5
    },
    signup: {
        backgroundColor: '#FFF',
        marginLeft: 5
    }
});

AppRegistry.registerComponent('Helpie', () => Helpie);
