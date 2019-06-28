import React, {Component} from 'react';
import {Platform, StyleSheet,TextInput,Image,TouchableOpacity ,ScrollView ,Text, View} from 'react-native';
import {Icon} from 'native-base';
import { createBottomTabNavigator, Router } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import { Ionicons } from '@expo/vector-icons';
import List from './List';

class Home extends Component {


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header2}>
          
           <View style={styles.headerIn}>
             <Text style={styles.text}> 
               Joe's Coffee House
               </Text>
               <Text style={styles.text2}>
                 Cappuccino, 2 Choco Cupcake
               </Text>

           </View>
          
          <View style={styles.headerIn}>
            
            <Image
            style={styles.imagepickup}
              source={require('./../assets/pickup.png')}  
            />

          </View>

          </View>


          <View style={styles.header2}>
            <Text style={styles.maintext}>
            All Restaurants  
            </Text> 

          </View>

          <List {...this.props}/>





          </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  },
  header2:{
    width:'100%',
    height:60,
    flexDirection:'row',
    marginTop:10,
    margin:5,
    //backgroundColor:'black'
  },
  headerIn:{
    flex:1,
    
  },
  text:{
    color:'black',
    fontSize:18,
    fontWeight:'500',
    textAlign:'center'
  },
  text2:{
    marginTop:10,
    color:'grey',
    fontSize:12,
    textAlign:'center'
  },
  imagepickup:{
    alignSelf:'center',
    height:40,
    borderRadius:40
  },
  maintext:{
    fontSize:20,
    fontWeight:'300',
    color:'grey',
    marginLeft:10
    
  }
 
});


class Rituals extends Component {



render() {
  return (
    <View style={styles.container}>
        <View>
            <Text>
                Rituals
            </Text>
        </View>
    </View>
  );
}
}

class Wall extends Component {


  

render() {
  return (
    <View style={styles.container}>
        <View>
            <Text>
                Wall
            </Text>
        </View>
    </View>
  );
}
}



class User extends Component {


  


render() {
  return (
    <View style={styles.container}>
        <View>
            <Text>
                User
            </Text>
        </View>
    </View>
  );
}
}




export default createBottomTabNavigator({
  Home: { screen: Home },
  Rituals: { screen: Rituals },
  Wall: { screen: Wall },
  User: { screen: User }
}, 
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
     // let iconName;
      let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    return <Ionicons name={iconName} size={25} color={tintColor} />;
    // We want to add badges to home tab icon
    //IconComponent = HomeIconWithBadge;
    //return <Ionicons name={iconName} size={25} color={tintColor} />;
  } else if (routeName === 'Rituals') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
    return <Ionicons name={iconName} size={25} color={tintColor} />;
  }
  else if (routeName === 'Wall') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
    return <Icon name={iconName} size={25} color={tintColor} />;
  }
  else if(routeName === 'User') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
    return <Icon name={iconName} size={25} color={tintColor} />;
  }

  // You can return any component that you like here!
  //return <IconComponent name={iconName} size={25} color={tintColor} />;
    },

  }),
  tabBarOptions: {
    activeTintColor: 'grey',
    inactiveTintColor: 'lightgrey',
    style: {
     // backgroundColor: 'white',
      textsize: 2,
      shadowColor: 'transparent',
    },
    indicatorStyle: {
      opacity: 0
    }
  },
  animationEnabled: true,
  swipeEnabled: true,
  showIcon: true,
  showLabel: true,
}
);