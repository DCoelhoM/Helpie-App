import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Button,
  Alert,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import AwesomeButton from 'react-native-awesome-button';

class MyRequestsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', myreq: []};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.myreq != nextState.myreq){
      return true;
    }
    return false;
  }
  componentWillMount(){
    AsyncStorage.getItem('id').then((value) => {
      this.setState({id: value});
      this.listmyreq();
    }).done();
  }
  listmyreq(){
    try {
      response = fetch('http://138.68.146.193:5000/listmyrequests', {
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
          console.log(responseJson);
          this.setState({myreq: responseJson.requests});
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
    return (
      <ScrollView  ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView}>
      <View style={styles.container} scrollEnabled={false}>

      <Text>
      {this.state.myreq.map(req => (
        "Title: " +  req.title + "\n"
        +
        "Description: " + req.description + "\n"
        +
        (req.list.length > 0 ? (
          "Item List: \n" + req.list.map(item => (
            " - " + item + " \n"
          ))
        ):"")
        +
        "Location: " + req.location + "\n"
        +
        "Created: " + req.created + "\n"
        +
        "Deadline: " + req.deadline + "\n"
        +
        "State: " + req.state + "\n"
        +
        (req.state != "active" ? (
          "Helper: " + req.helper + "\n"
        ):"")
        +
        (req.state == "ended" ? (
          "Feedback: " + req.feedback + "\n"
          +
          "Feedback Helper: " + req.feedback_helper + "\n"
        ):"")
        +
        "===================================\n"
      ))}
      </Text>

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

module.exports = MyRequestsPage;

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
