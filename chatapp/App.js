import React from 'react';
import { Text, StyleSheet, AppRegistry, View } from 'react-native';
import Route from './components/routing.js';


class App extends React.Component {

  render() {
    return (
     <Route/>
    );
  }
}

export default App;
AppRegistry.registerComponent('chatapp', () => App);
