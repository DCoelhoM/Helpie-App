import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Navigator,
  Image,
  Button,
  TextInput,
  Alert,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';

//var RequestsMenuPage = require('./RequestsMenuPage.js');

class CreateRequestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', locations: [], n_items: '0',title: '', description: '', list: [], loc_id: '', deadline: new Date()};
  }
  componentWillMount() {
    try {
      AsyncStorage.getItem('id').then((value) => {
        this.setState({id: value});
        this.getuserlocations();
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  getuserlocations(){
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
        if (parseInt(responseJson.state) == 1){
          locations_name = [];
          responseJson.locations.forEach((location) => {
            locations_name[location.id]=location.name;
          });
          console.log(locations_name);
          this.setState({locations: locations_name});
          //TODO
        } else {
          Alert.alert('No locations found');
        }
      }).done();
    }catch(error) {
      console.error(error);
    }
  }
  createrequest(){
    let i_list = []
    for (let item_i in this.state.list) {
        console.log(item_i+': '+this.state.list[item_i]);
        i_list.push({item: this.state.list[item_i]});
    }
    try {
      response = fetch('http://138.68.146.193:5000/createrequest', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          list: i_list,
          loc_id: this.state.loc_id,
          deadline: this.state.deadline,
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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.locations != nextState.locations){
      return true;
    }
    if (this.state.n_items != nextState.n_items){
      return true;
    }
    return false;
  }

  updateItemList(text, item) {
    console.log(this.state.list);
    l = this.state.list;
    l[item]=text;
    this.setState({list : l});
  }

  getItemList() {
    console.log(this.state.list);
  }

  _back () {
    var navigator = this.props.navigator;
    navigator.replace({id: 'RequestsMenuPage'});
  }
  addItem(){
    let n = this.state.n_items;
    n++;
    this.setState({ n_items: n });
  }
  removeItem(){
    let n = this.state.n_items;
    n--;
    this.setState({n_items: n });
  }
  render () {
    let rows = [];
    for(let i=0; i<this.state.n_items;i++){
      rows.push(
        <View style={styles.inputContainer}>
        <TextInput
        key={"item_"+i}
        style={styles.input}
        autoCapitalize={'none'}
        placeholder={'Item '+(i+1)}
        maxLength={32}
        onChangeText={(text) => this.updateItemList(text, "item_"+i)}
        />
        </View>
      );
    }
    return (
      <ScrollView  ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView} contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.container2}>
      <Image
      style={{width:108 ,height: 136}}
      source={require('../img/logowhite.png')}
      />

      <View style={styles.inputContainer}>
      <TextInput
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Title'
      maxLength={32}
      onChangeText={(text) => this.setState({title: text})}
      />
      </View>

      <View style={styles.inputContainer}>
      <TextInput
      style={styles.input}
      autoCapitalize={'none'}
      placeholder='Description'
      maxLength={256}
      onChangeText={(text) => this.setState({description: text})}
      />
      </View>

      <View style={styles.inputContainer}>
      <View style={styles.itemlist}>
      <Text style={styles.textil}>Item List:</Text>
      <TouchableHighlight onPress={ this.removeItem.bind(this) } style={styles.itemlist_button}>
      <Text>-</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={ this.addItem.bind(this) } style={styles.itemlist_button}>
      <Text>+</Text>
      </TouchableHighlight>
      </View>
      </View>

      <View style={styles.dropdown}
      ref={component => this.itemList = component}
      >
      {rows}
      </View>

      <View style={styles.select}>
      <ModalDropdown
      options={this.state.locations}
      textStyle={styles.dropdowntext}
      dropdownStyle={styles.dropdown}
      onSelect={(idx, value) => {this.setState({loc_id: idx})}}
      />
      </View>

      <View style={styles.date_input}>
      <DatePicker
      style={{width: 200}}
      date={this.state.deadline}
      mode="datetime"
      placeholder="Deadline"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      onDateChange={(date) => {this.setState({deadline: date})}}
      />
      </View>

      <View style={styles.btn}>
      <Button
      color='#3197d6ff'
      onPress={this.createrequest.bind(this)}
      title="Create Request"
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
      </ScrollView>
    );
  }
}

module.exports = CreateRequestPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3197d6ff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#3197d6ff',
  },
  container2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3197d6ff',
  },
  inputContainer: {
    width: 200,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  input: {
    width: 200,
    height: 40,
  },
  select: {
    marginTop: 20,
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  dropdown: {
    width: 200,
  },
  dropdowntext: {
    color: '#FFF',
  },
  date_input: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  btn: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#FFF',
  },
  back: {
    width: 200,
    marginTop: 20,
    backgroundColor: '#095188',
  },
  tcontainer: {
    flex: 1,
    marginTop: 60,
  },
  gray: {
    backgroundColor: '#efefef'
  },
  row: {
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#ededed',
    borderBottomWidth: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height:55,
    backgroundColor: '#ededed',
    marginBottom:10
  },
  itemlist: {
    marginTop: 10,
    flexDirection: 'row',
    height: 40,
  },
  itemlist_button: {
    height: 25,
    width: 25,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : '#FFF'
  },
  textil: {
    marginLeft: 0,
    fontSize: 18,
  },
});
