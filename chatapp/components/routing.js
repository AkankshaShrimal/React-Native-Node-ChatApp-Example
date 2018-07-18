import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import Home from './HomeScreen/home.js';
import ChatTemplate from './ChatScreen/chatTemplate.js';



const RootStack = createStackNavigator(
  {
    Home: Home,
    chat : ChatTemplate  ,
    
  },
  {
    initialRouteName: 'Home',
  }
);

export default class Route extends React.Component {
  render() {
    return <RootStack />;
  }
}