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
  AsyncStorage,
} from 'react-native'

var RegisterPage = require('./RegisterPage.js');

var MainMenuPage = require('./MainMenuPage.js');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''  };
  }
  componentWillMount() {
      try {
        AsyncStorage.getItem('login').then((value) => {
          if (value=='true'){
            var navigator = this.props.navigator;
            navigator.replace({id: 'MainMenuPage'});
          }
        }).done();
      }catch(error) {
        console.error(error);
      }
  }
  _signin () {
    try {
      response = fetch('http://138.68.146.193:5000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (parseInt(responseJson.state) == 1){
          try {
            AsyncStorage.setItem('login','true');
            AsyncStorage.setItem('id',responseJson.id.toString());
            AsyncStorage.setItem('name',responseJson.name);
            AsyncStorage.setItem('email',responseJson.email);
          } catch (error) {
            console.error(error);
          }
          //Alert.alert('Login',responseJson.msg,[{text: 'Login', onPress: navigator.replace({id: 'MainMenuPage'})},]);
          var navigator = this.props.navigator;
          navigator.replace({id: 'MainMenuPage'});
        } else {
          Alert.alert('Register',responseJson.msg);
          this._email.setNativeProps({text: ''});
          this._pw.setNativeProps({text: ''});
        }
      }).done();
    }catch(error) {
      console.error(error);
    }
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
      <TextInput
      ref={component => this._email = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='E-mail'
      maxLength={32}
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

      <View style={styles.btn}>
      <View style={styles.signin}>
      <Button
      color='#3197d6ff'
      onPress={this._signin.bind(this)}
      title="Sign In"
      />
      </View>
      <View style={styles.signup}>
      <Button
      color='#3197d6ff'
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
    marginRight: 5,
  },
  signup: {
    backgroundColor: '#FFF',
    marginLeft: 5,
  }
});

AppRegistry.registerComponent('Helpie', () => Helpie);
