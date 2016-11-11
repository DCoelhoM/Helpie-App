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
  componentWillMount() {
    var navigator = this.props.navigator;
  }
  _register() {
    const name_min_length = 3;
    const mail_regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    const pw_min_length = 8;
    if (this.state.name.length >= name_min_length){
      if (mail_regex.test(this.state.email)){
        if (this.state.password.length >= pw_min_length){
          if (this.state.password == this.state.cpassword){
            try {
              response = fetch('http://138.68.146.193:5000/', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: this.state.name,
                  email: this.state.email,
                  password: this.state.password,
                })
              }).then((response) => response.json())
              .then((responseJson) => {
                if (parseInt(responseJson.state) == 1){
                  Alert.alert('Register',responseJson.msg,[{text: 'Login', onPress: this._login.bind(this)},]);
                } else {
                  Alert.alert('Register',responseJson.msg);
                }
                this._name.setNativeProps({text: ''});
                this._email.setNativeProps({text: ''});
                this._pw.setNativeProps({text: ''});
                this._cpw.setNativeProps({text: ''});
              });
            }catch(error) {
              console.error(error);
            }
          }
          else {
            Alert.alert("Passwords don't match.");
            this._pw.setNativeProps({text: ''});
            this._cpw.setNativeProps({text: ''});
          }
        }
        else {
          Alert.alert("Password too short.");
          this._pw.setNativeProps({text: ''});
          this._cpw.setNativeProps({text: ''});
        }
      }
      else {
        Alert.alert("Invalid email.");
        this._email.setNativeProps({text: ''});
      }
    }
    else {
      Alert.alert("Name too short.");
      this._name.setNativeProps({text: ''});
    }
  }
  _login(){
    var navigator = this.props.navigator;
    navigator.replace({id: 'LoginPage'});
  }
  render() {
    return (
      <View style={styles.container}>
      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._name = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Name'
      maxLength={16}
      onChangeText={(text) => this.setState({name: text})}
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._email = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='E-mail'
      onChangeText={(text) => this.setState({email: text})}
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._pw = component}
      style={styles.input}
      secureTextEntry={true}
      placeholder='Password'
      onChangeText={(text) => this.setState({password: text})}
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._cpw = component}
      style={styles.input}
      secureTextEntry={true}
      placeholder='Confirm Password'
      onChangeText={(text) => this.setState({cpassword: text})}
      />
      </View>


      <View style={styles.register}>
      <Button
      color='#3197d6ff'
      onPress={this._register.bind(this)}
      title="Register"
      />
      </View>
      <View style={styles.login}>
      <Button
      color='#3197d6ff'
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
