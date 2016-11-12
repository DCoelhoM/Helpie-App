import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
  MapView,
  AsyncStorage,
  Alert,
} from 'react-native';

var LocationsMenuPage = require('./LocationsMenuPage.js');

class MyLocationsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '',annotations: []};
  }
  componentWillMount() {
    try {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({id: value});
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
            if (parseInt(responseJson.state) == 1){
              responseJson.locations.forEach(function(locations) {
                id = locations.id;
                name = locations.name;
                lon = parseFloat(locations.longitude);
                lat = parseFloat(locations.latitude);
                point = {longitude: lon,latitude: lat,title: name, onFocus: () =>
                  Alert.alert(
                    "Location",
                    locations.name,
                    [
                      {text: 'OK'},
                      {text: 'Delete', onPress: () => this._deletelocation.bind(locations.id) , style: 'destructive'},
                    ]
                  )}
                loc_points.push(point);
              });
              this.setState({annotations : loc_points});
            } else {
              Alert.alert('No locations found');
            }
          }).done();
        }catch(error) {
          console.error(error);
        }
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.annotations != nextState.annotations){
      return true;
    }
    return false;
  }
  _deletelocation (id){
    try {
      response = fetch('http://138.68.146.193:5000/deletelocation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loc_id: id,
          user_id: this.state.id,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (parseInt(responseJson.state) == 1){
          Alert.alert(responseJson.msg);
        } else {
          Alert.alert('No locations found');
        }
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
    return (
      <View style={styles.container} scrollEnabled={false}>

      <Image
      style={{width:108 ,height: 136, marginBottom: 10}}
      source={require('../img/logowhite.png')}
      />

      <MapView
      style={{height: 200, width: 200}}
      followUserLocation={true}
      annotations={this.state.annotations}
      />

      <View style={styles.btn}>
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
    marginTop: 20,
    backgroundColor: '#095188'
  },
});
