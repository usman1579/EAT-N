import { createSwitchNavigator, createStackNavigator ,createAppContainer,createDrawerNavigator} from 'react-navigation';
import login from './login/login';
import Home from './Home/Home';
import React, {Component} from 'react';
import {Icon} from 'native-base';

var stack= createStackNavigator({
  Home:{
  screen:Home,
  navigationOptions: () => ({
    title: `Home`,
    headerStyle: {
      elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
    },
    headerTitleStyle: {
      textAlign: 'center',
      flexGrow:1,
      alignSelf:'center',
  },
   headerRight: <Icon name="md-cart" style={{ marginRight: 10 , color:"grey" }} size={27} onPress={() => navigation.navigate('CART')}  />,
    headerTintColor:'grey'
  })

  },
  
  },{
    initialRouteName:'Home'
  })


var RootStack= createSwitchNavigator(
  {
    Home:{
      screen:stack
    },
    login: {
      screen: login
    }
  },
  {
    initialRouteName: 'login',
  }
);
const App = createAppContainer(RootStack);

export default App;