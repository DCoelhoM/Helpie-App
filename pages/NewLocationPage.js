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

import MapView from 'react-native-maps';

class NewLocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', initialPosition: 'unknown', loc_name: '', latitude: 0.0, longitude: 0.0};
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        this.setState({latitude: position.coords.latitude});
        this.setState({longitude: position.coords.longitude});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}

    );
  }
  componentWillMount(){
    AsyncStorage.getItem('id').then((value) => {
      this.setState({'id': value});
    }).done();
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
    let ir = {
      latitude: parseFloat(this.state.latitude - 5),
      longitude: parseFloat(this.state.longitude - 5),
      latitudeDelta: parseFloat(this.state.latitude + 5),
      longitudeDelta: parseFloat(this.state.longitude + 5),
    };
    let m = {
      latitude: parseFloat(this.state.latitude),
      longitude: parseFloat(this.state.longitude),
    };
    Alert.alert("Coords",JSON.stringify(m));
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.inputContainer}>
      <TextInput
      ref={component => this._loc = component}
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Location Name'
      maxLength={16}
      onChangeText={(text) => this.setState({loc_name: text})}
      />
      </View>

      <View>
      <MapView
        style={{
          height: 200,
          width: 200,
        }}
        initialRegion={ir}
      >
      /*<MapView.Marker
        coordinate={m}
        title={"You are here!"}
      />*/
      </MapView>
      </View>

      <View style={styles.save}>
      <Button
      color='#3197d6ff'
      onPress={this._save.bind(this)}
      title="Save"
      />
      </View>

      <View style={styles.back}>
      <Button
      color='#3197d6ff'
      onPress={this._back.bind(this)}
      title="Back"
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
  inputContainer: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
  },
  save: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  back: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
});
