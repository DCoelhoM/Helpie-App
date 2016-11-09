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
var ProfilePage = require('./pages/ProfilePage.js');

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
    if (routeId === 'ProfilePage') {
      return (
        <ProfilePage
          navigator={navigator}
          email={navigator.email}/>
      );
    }
  }
}

AppRegistry.registerComponent('Helpie', () => Helpie);
