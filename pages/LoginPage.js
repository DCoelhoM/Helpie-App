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

import AwesomeButton from 'react-native-awesome-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''};
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
      <Sae
        style={styles.input}
        ref={component => this._email = component}
        label={'Email'}
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

      <View style={styles.btn}>
      <View style={styles.signin}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Sign In',
          onPress: this._signin.bind(this),
          backgroundColor: '#FFF',
        }
      }}
      buttonState={'default'}
      />
      </View>
      <View style={styles.signup}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Sign Up',
          onPress: this._signup.bind(this),
          backgroundColor: '#FFF',
        }
      }}
      buttonState={'default'}
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
  input: {
    width: 200,
    height: 40,
  },
  btn: {
    marginTop: 20,
    flexDirection: 'row',
    height: 40,
  },
  signin: {
    width: 95,
    marginRight: 5,
  },
  signup: {
    width: 95,
    marginLeft: 5,
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

AppRegistry.registerComponent('Helpie', () => Helpie);
