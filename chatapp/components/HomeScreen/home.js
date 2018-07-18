import * as React from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Constants } from 'expo';
import AllChats from '../Chatstab/allChats.js';


const SecondRoute = () => (
  <ScrollView style={[styles.scene, { backgroundColor: 'white' }]} />
);

class Home extends React.Component {

  static navigationOptions = {      // TITLE FOR NAVIGATION
   title: 'CHAT',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      
    },
  };
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'chats', navigation : this.props.navigation },
      { key: 'second', title: 'contacts' },

    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => <TabBar {...props} style={styles.header} />;

  _renderScene = SceneMap({
    first: AllChats ,
    second: SecondRoute,

  });


  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  header: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'blue',
  },
});

export default Home;