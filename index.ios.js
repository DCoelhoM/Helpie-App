/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

var SplashPage = require('./pages/SplashPage.js');

var LoginPage = require('./pages/LoginPage.js');
var RegisterPage = require('./pages/RegisterPage.js');
var MainMenuPage = require('./pages/MainMenuPage.js');

var ProfilePage = require('./pages/ProfilePage.js');
var RequestsMenuPage = require('./pages/RequestsMenuPage.js');
var LocationsMenuPage = require('./pages/LocationsMenuPage.js');

var CreateRequestPage = require('./pages/CreateRequestPage.js');
var NearbyRequestsPage = require('./pages/NearbyRequestsPage.js');
var MyRequestsPage = require('./pages/MyRequestsPage.js');

var NewLocationPage = require('./pages/NewLocationPage.js');
var MyLocationsPage = require('./pages/MyLocationsPage.js');

export default class Helpie extends Component {
  render() {
    return (
      <Navigator
      initialRoute={{id: 'SplashPage', name: 'Index'}}
      renderScene={this.renderScene.bind(this)}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.VerticalDownSwipeJump;
      }}/>
    );
  }
  renderScene ( route, navigator  ) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'RegisterPage') {
      return (
        <RegisterPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'MainMenuPage') {
      return (
        <MainMenuPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'ProfilePage') {
      return (
        <ProfilePage
        navigator={navigator}/>
      );
    }
    if (routeId === 'RequestsMenuPage') {
      return (
        <RequestsMenuPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'CreateRequestPage') {
      return (
        <CreateRequestPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'NearbyRequestsPage') {
      return (
        <NearbyRequestsPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'MyRequestsPage') {
      return (
        <MyRequestsPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'LocationsMenuPage') {
      return (
        <LocationsMenuPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'NewLocationPage') {
      return (
        <NewLocationPage
        navigator={navigator}/>
      );
    }
    if (routeId === 'MyLocationsPage') {
      return (
        <MyLocationsPage
        navigator={navigator}/>
      );
    }
  }
}

AppRegistry.registerComponent('Helpie', () => Helpie);
