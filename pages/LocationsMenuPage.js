import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';

class LocationsMenuPage extends Component {
  constructor(props) {
    super(props);
  }

  _saveloc () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'NewLocationPage'});
  }

  _myloc () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'MyLocationsPage'});
  }
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'MainMenuPage'});
  }
  render () {
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Save Location',
          onPress: this._saveloc.bind(this),
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
          text: 'My Locations',
          onPress: this._myloc.bind(this),
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
          text: 'Back',
          onPress: this._back.bind(this),
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

module.exports = LocationsMenuPage;

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
