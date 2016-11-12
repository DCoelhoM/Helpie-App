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
        console.log("1 ------->");
        console.log(this.state.annotations);
        if (parseInt(responseJson.state) == 1){
          responseJson.locations.forEach((location) => {
            point = {longitude: parseFloat(location.longitude),latitude: parseFloat(location.latitude),title: location.name, onFocus: () => {this.infolocation(location.name,location.id)}};
            loc_points.push(point);
          });
          this.setState({annotations : loc_points});
          console.log("2 ------->");
          console.log(this.state.annotations);
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
      "Location",
      name,
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
