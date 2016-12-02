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

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae} from 'react-native-textinput-effects';
import DatePicker from 'react-native-datepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import AwesomeButton from 'react-native-awesome-button';


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
        <Sae
          style={styles.input}
          key={'item_'+i}
          label={'Item '+(i+1)}
          maxLength={32}
          labelStyle={{color: '#f2f2f2'}}
          iconClass={FontAwesomeIcon}
          iconName={'pencil'}
          iconColor={'white'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText={(text) =>  this.updateItemList(text, "item_"+i)}
        />
      );
    }
    return (
      <ScrollView  ref='scrollView' keyboardDismissMode='interactive' style={styles.scrollView}>
      <View style={styles.container}>

      <Sae
        style={styles.input}
        label={'Title'}
        maxLength={32}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={(text) => this.setState({title: text})}
      />

      <Sae
        style={styles.input}
        label={'Description'}
        maxLength={256}
        labelStyle={{color: '#f2f2f2'}}
        iconClass={FontAwesomeIcon}
        iconName={'pencil'}
        iconColor={'white'}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={(text) => this.setState({description: text})}
      />

      <View style={styles.inputContainer}>
      <View style={styles.itemlist}>
      <Text style={styles.itemlist_text}>Item List:</Text>
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
      onDateChange={(date) => {this.setState({deadline: date}); this.props.date = date;}}
      />
      </View>

      <View style={styles.btn}>
      <AwesomeButton
      backgroundStyle={styles.buttonBackground}
      labelStyle={styles.buttonLabel}
      states={{
        default: {
          text: 'Create Request',
          onPress: this.createrequest.bind(this),
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

module.exports = CreateRequestPage;

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
  inputtcontainer: {
    flex: 1,
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
  itemlist_text: {
    marginLeft: 0,
    fontSize: 18,
    color: '#f2f2f2',
  }
});
