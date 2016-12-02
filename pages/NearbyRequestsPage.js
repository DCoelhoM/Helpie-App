import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Alert,
  AsyncStorage,
} from 'react-native';
import Dimensions from 'Dimensions';

import AwesomeButton from 'react-native-awesome-button';
import MapView from 'react-native-maps';

class NearbyRequestsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', initialPosition: 'unknown', loc_name: '', latitude: 0.0, longitude: 0.0, requests: []};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.latitude != nextState.latitude){
      return true;
    }
    if (this.state.longitude != nextState.longitude){
      return true;
    }
    if (this.state.requests != nextState.requests){
      return true;
    }
    return false;
  }
  componentWillMount(){
    AsyncStorage.getItem('id').then((value) => {
      this.setState({id: value});
      this.getrequests();
    }).done();
  }
  componentDidMount(){
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
  getrequests(){
    try {
      response = fetch('http://138.68.146.193:5000/listrequests', {
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
        if (parseInt(responseJson.state) == 1){
          this.setState({requests: responseJson.requests});
          console.log(responseJson.requests);
        } else {
          Alert.alert(responseJson.msg);
        }
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }
  render () {
    const w_width = Dimensions.get('window').width;
    return (
      <View style={styles.container} scrollEnabled={false}>

      <View>
      <MapView
      style={{marginTop:20, height: w_width,width: w_width,}}
      initialRegion={{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 2,
        longitudeDelta: 2,
      }}
      >
      {this.state.requests.map(marker => (
        <MapView.Marker
        coordinate={{
          latitude: parseFloat(marker.latitude),
          longitude: parseFloat(marker.longitude),
        }}
        title={marker.title}
        description={marker.description}
        onPress={() => {
          Alert.alert(
            marker.title,
            JSON.stringify(marker.list),
            [
              {text: 'Accept', onPress: () => {}},
              {text: 'Back'},
            ]
          );
        }}
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

module.exports = NearbyRequestsPage;

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
