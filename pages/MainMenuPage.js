import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
  AsyncStorage,
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';

class MainMenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', name: '', email: ''};
  }
  componentWillMount(){
    try {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({'id': value});
      }).done();
      AsyncStorage.getItem('name').then((value) => {
        this.setState({'name': value});
      }).done();
      AsyncStorage.getItem('email').then((value) => {
        this.setState({'email': value});
      }).done();
    }catch(error) {
      console.error(error);
    }
  }

  _requests () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }

  _locations () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LocationsMenuPage'});
  }
  _logout () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LoginPage'});
    try {
      AsyncStorage.removeItem('login');
      AsyncStorage.removeItem('id');
      AsyncStorage.removeItem('name');
      AsyncStorage.removeItem('email');
    } catch (error) {
      console.log(error);
    }
  }
  render () {
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <Text>
      {this.state.email}
      </Text>

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Requests',
          onPress: this._requests.bind(this),
          backgroundColor: '#FFF',
        }
      }}
      buttonState={'default'}
      />
      </View>

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Locations',
          onPress: this._locations.bind(this),
          backgroundColor: '#FFF',
        }
      }}
      buttonState={'default'}
      />
      </View>

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Logout',
          onPress: this._logout.bind(this),
          backgroundColor: '#095188',
        }
      }}
      buttonState={'default'}
      />
      </View>

      </View>
    );
  }
}

module.exports = MainMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  btn: {
    width: 200,
    height: 40,
    marginTop: 20,
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
