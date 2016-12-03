import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ScrollView,
  Alert,
  AsyncStorage,
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';

class RequestInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: ''};
  }
  componentWillMount(){
    AsyncStorage.getItem('id').then((value) => {
      this.setState({id: value});
    }).done();
  }
  acceptreq(){
    try {
      response = fetch('http://138.68.146.193:5000/acceptrequest', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.id,
          req_id: this.props.reqid,
        })
      }).then((response) => response.json())
      .then((responseJson) => {
        if (parseInt(responseJson.state) == 1){
          Alert.alert('Request',responseJson.msg,[{text: 'Requests Menu', onPress: this._backmenu.bind(this)},]);
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
    navigator.replace({id: 'NearbyRequestsPage'});
  }
  _backmenu () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }
  render () {
    return (
      <ScrollView  ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView}>
      <View style={styles.container}>
      <Text style={styles.appname}>
      {'\nHelpie'}
      </Text>
      <Text style={styles.version}>
      {
      this.props.reqid + "\n"
      +
      this.props.title + "\n"
      +
      this.props.description + "\n"
      +
      (this.props.list.length > 0 ? (
        "Item List: \n" + this.props.list.map(item => (
          " - " + item + " \n"
        ))
      ):"")
      +
      "Deadline: " + this.props.deadline + "\n"
      +
      "Request by: " + this.props.owner + "\n"
      +
      "Feedback: " + this.props.feedback + "/10"
      }
      </Text>

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Accept Request',
          onPress: this.acceptreq.bind(this),
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
      </ScrollView>
    );
  }
}

module.exports = RequestInfoPage;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#3197d6ff',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  appname: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 30,
    textAlign: 'center',
    margin: 10
  },
  version: {
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
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
