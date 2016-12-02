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
  MapView,
} from 'react-native';
import Dimensions from 'Dimensions';

class NearbyRequestsPage extends Component {
  constructor(props) {
    super(props);
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
          user_id: 1,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (parseInt(responseJson.state) == 1){
          Alert.alert(responseJson.msg);
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
    this.getrequests();
    var w_width = Dimensions.get('window').width;
    console.log(w_width);
    return (
      <View style={styles.container} scrollEnabled={false}>
      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />
      <MapView
      style={{height: w_width, width: w_width, marginTop:10}}
      showsUserLocation={true}
      />

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

module.exports = NearbyRequestsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  back: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
});
