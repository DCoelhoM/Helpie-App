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

var LoginPage = require('./LoginPage.js');

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '', cpassword: ''  };
                  
  }
  componentWillMount () {
    var navigator = this.props.navigator;
  }
  _handler () {
    Alert.alert('Name: ' + this.state.name + '\nE-mail: ' + this.state.email + '\nPassword: ' + this.state.password + '\nConfirm Password: ' + this.state.cpassword);
  }
  _login (){
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

        <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          autoCapitalize={'none'}
          placeholder='Name'
          maxLength={16}
          onChangeText={(text) => this.setState({name: text})}
        />
        </View>

        <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          autoCapitalize={'none'}
          placeholder='E-mail'
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

        <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          secureTextEntry={true}
          placeholder='Confirm Password'
          onChangeText={(text) => this.setState({cpassword: text})}
        />
        </View>


        <View style={styles.register}>
        <Button 
          onPress={this._handler.bind(this)}
          title="Register"
        />
        </View>
        <View style={styles.login}>
        <Button 
          onPress={this._login.bind(this)}
          title="Login"
        />
        </View>
      </View>
    );
  }
}

module.exports = RegisterPage;

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
  register: {
      width: 200,
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    login: {
        width: 200,
        marginTop: 10,
        backgroundColor: '#FFF',
    }
});
