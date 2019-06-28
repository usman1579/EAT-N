import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,TextInput, TouchableOpacity, ScrollView, AsyncStorage  } from 'react-native';
//import * as SecureStore from 'expo-secure-store';




_storeData = async (token) => {
  try {
    console.log(token);
    await AsyncStorage.setItem('token', 'I like to save it.');
  } catch (error) {
    // Error saving data
  }
};


export default class login extends Component{

  constructor(props) {
    super(props);
    this.state = {
      email:'test@test.com',
      password:'testuser123'
    }
  }

  handlelogin = () => {

    fetch(`https://dev.eatnnow.com/customer/login/`, {
      method: "POST",
      body: JSON.stringify({username:this.state.email,password:this.state.password}),
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      }
  })
      .then(res => res.json())
      .then(async (response) => {
          console.log('user login response: ',response);
          if (response.success === "false") {
            console.log('incorrect password');             
          }
          else{

        //  save token for expo
        //  await SecureStore.setItemAsync('secure_token', response.token);
        //  const token = await SecureStore.getItemAsync('secure_token');
        //  console.log(token)

        // save token in device for native
        await AsyncStorage.setItem('token', response.token);
        const token= await AsyncStorage.getItem('token');
        console.log('saved token :',token)

            this.props.navigation.navigate('Home');
          }
          
      })
      .catch(err => {
          console.log('err while login: ',err)
      })



  } 

    render(){
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.logoview}>
      <Image
                style={styles.logo}
                source={require('./../assets/eatn.png')}  
               /> 

      </View>
      
      <View>
        <Text style={styles.signin}>
          Sign In
        </Text>
      </View>
      
      
      
      <View style={{alignItems:'center'}}>
          <TextInput
          style={styles.button1}
          placeholder="Username"
          placeholderTextColor='grey'
          textAlign={'center'}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          />
      </View>

      <View style={{alignItems:'center'}}>
          <TextInput
          style={styles.button1}
          placeholder="Password"
          placeholderTextColor='grey'
          textAlign={'center'}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          />
      </View>
   
      <TouchableOpacity style={styles.buttonsignin}
       onPress={ this.handlelogin }>
          <Text style={{color:'white', fontWeight:'bold',textAlign:'center'}}>
            Sign In
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonforgot}>
          <Text style={{color:'grey',fontSize:12 ,textAlign:'center'}}>
            Forgot your password?
          </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonfacebook}>
          <Image

          source={require('./../assets/facebook.png')}  
          />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonfacebook}>
          <Image
          source={require('./../assets/google.png')}  
          />
      </TouchableOpacity>


      <TouchableOpacity style={styles.noaccount}>
          <Image
          source={require('./../assets/noaccount.png')}  
          />
      </TouchableOpacity>
 
    </ScrollView>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  logo:{
    width:'40%',
    height: 80,
    resizeMode : 'stretch' ,
    marginTop:20,
  },
  logoview:{
    alignItems:'center',
    marginTop:50,
  },
  signin:{
    fontSize:14,
    fontWeight:'bold',
    textAlign:'center',
    margin:20
  },
  button1:{
    width:"75%",
    height:50,
    borderRadius:40,
    backgroundColor:'white',
    marginVertical:5,
    // shadowColor: 'grey',
    // shadowOpacity: 2,
    // elevation: 15,
    // shadowRadius: 15,
    // shadowOffset : { width: 56, height: 23},
  },
  buttonsignin:{
    width:"75%",
    height:40,
    borderRadius:40,
    backgroundColor:'#6BA1FF',
    marginVertical:10,
    fontSize:16,
    fontWeight:'bold',
    color:'white',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonforgot:{
    width:"60%",
    height:40,
    backgroundColor:'white',
    marginVertical:2,
    fontSize:16,
    fontWeight:'bold',
    color:'white',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonfacebook:{
    width:"75%",
    height:50,
    borderRadius:40,
    backgroundColor:'white',
    marginVertical:5,
    fontSize:16,
    fontWeight:'bold',
    color:'white',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    
  },
  noaccount:{
    width:"60%",
    height:20,
    marginTop:20,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  }


});
