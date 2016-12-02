import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  AsyncStorage,
  Alert,
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';
import MapView from 'react-native-maps';

class MyLocationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '',annotations: []};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.annotations != nextState.annotations){
      return true;
    }
    return false;
  }
  componentWillMount() {
    try {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({id: value});
        this.loadlocations();
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  loadlocations(){
    try {
      response = fetch('http://138.68.146.193:5000/mylocations', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.id,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        var loc_points = this.state.annotations.slice();
        this.setState({
          annotations: this.state.annotations.filter(a => false)
        });
        if (parseInt(responseJson.state) == 1){
          responseJson.locations.forEach((location) => {
            point = {longitude: parseFloat(location.longitude),latitude: parseFloat(location.latitude),title: location.name};
            //, onFocus: () => {this.infolocation(location.name,location.id)}};
            loc_points.push(point);
          });
          this.state.annotations=loc_points;
          this.forceUpdate();
        } else {
          Alert.alert('No locations found');
        }
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  infolocation(name,id){
    Alert.alert(
      name,
      '',
      [
        {text: 'OK'},
        {text: 'Delete', onPress: () => {this.deletelocation(id)}, style: 'destructive'},
      ]
    );
  }

  deletelocation(id){
    try {
      response = fetch('http://138.68.146.193:5000/deletelocation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loc_id: id,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        if(parseInt(responseJson.state) == 1){
          this.loadlocations();
        }
        Alert.alert(responseJson.msg);
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'LocationsMenuPage'});
  }
  render () {
    let lat = 0;
    let lon = 0;
    if (!(this.state.annotations[0] === undefined)){
      lat = this.state.annotations[0].latitude;
      lon = this.state.annotations[0].longitude;
    }
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136, marginBottom: 10}}
      source={require('../img/logowhite.png')}
      />

      <View>
      <MapView
      style={{marginTop:20, height: 200,width: 200,}}
      initialRegion={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      >
      {this.state.annotations.map(marker => (
        <MapView.Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        title={marker.title}
        />
      ))}
      </MapView>
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

module.exports = MyLocationsPage;

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
