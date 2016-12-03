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
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import MapView from 'react-native-maps';

class NewLocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', initialPosition: 'unknown', loc_name: '', latitude: 0.0, longitude: 0.0};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.latitude != nextState.latitude){
      return true;
    }
    if (this.state.longitude != nextState.longitude){
      return true;
    }
    return false;
  }
  componentWillMount(){
    AsyncStorage.getItem('id').then((value) => {
      this.setState({'id': value});
    }).done();
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        this.setState({latitude: position.coords.latitude});
        this.setState({longitude: position.coords.longitude});
        this.forceUpdate();
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  _save () {
    const name_min_length = 3;
    if (this.state.loc_name.length >= name_min_length){
      try {
        response = fetch('http://138.68.146.193:5000/savelocation', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.state.id,
            name: this.state.loc_name,
            longitude: this.state.longitude,
            latitude: this.state.latitude,
          })
        }).then((response) => response.json())
        .then((responseJson) => {
          if (parseInt(responseJson.state) == 1){
            Alert.alert('Location',responseJson.msg,[{text: 'Locations Menu', onPress: this._back.bind(this)},]);
          } else {
            Alert.alert('Location',responseJson.msg);
            this._loc.setNativeProps({text: ''});
          }
        }).done();
      }catch(error) {
        console.error(error);
      }
    }
    else {
      Alert.alert("Name too short.");
      this._loc.setNativeProps({text: ''});
    }
  }
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LocationsMenuPage'});
  }
  render () {
    let lat = this.state.latitude;
    let lon = this.state.longitude;
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <Sae
        style={styles.input}
        label={'Location Name'}
        maxLength={16}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={(text) => this.setState({loc_name: text})}
      />

      <View>
      <MapView
      style={{marginTop:20, height: 200,width: 200,}}
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      >
      <MapView.Marker
      coordinate={{
        latitude: lat,
        longitude: lon,
      }}
      title={"You are here!"}
      />
      </MapView>
      </View>

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Save',
          onPress: this._save.bind(this),
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

module.exports = NewLocationPage;

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
