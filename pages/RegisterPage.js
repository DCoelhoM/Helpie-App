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

import AwesomeButton from 'react-native-awesome-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';

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
              response = fetch('http://138.68.146.193:5000/register', {
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
                  this._name.setNativeProps({text: ''});
                  this._email.setNativeProps({text: ''});
                  this._pw.setNativeProps({text: ''});
                  this._cpw.setNativeProps({text: ''});
                }
              }).done();
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

      <Sae
        style={styles.input}
        label={'Name'}
        maxLength={16}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={(text) => this.setState({name: text})}
      />
      <Sae
        style={styles.input}
        label={'E-mail'}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={(text) => this.setState({email: text})}
      />
      <Sae
        style={styles.input}
        ref={component => this._pw = component}
        label={'Password'}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => this.setState({password: text})}
      />
      <Sae
        style={styles.input}
        ref={component => this._pw = component}
        label={'Confirm Password'}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={(text) => this.setState({cpassword: text})}
      />


      <View style={styles.register}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Register',
          onPress: this._register.bind(this),
          backgroundColor: '#FFF',
        }
      }}
      buttonState={'default'}
      />
      </View>
      <View style={styles.login}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Login',
          onPress: this._login.bind(this),
          backgroundColor: '#FFF',
        }
      }}
      buttonState={'default'}
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
  input: {
    width: 200,
    height: 40,
  },
  register: {
    width: 200,
    height: 40,
    marginTop: 20,
  },
  login: {
    width: 200,
    height: 40,
    marginTop: 10,
  },
  buttonBackground: {
    flex: 1,
    height: 40,
    borderRadius: 5
  },
  buttonLabel: {
    color: '#3197d6ff'
  }
});
