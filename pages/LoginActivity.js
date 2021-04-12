import React, {useState} from 'react';
import { Text, View, Button, TextInput, ImageBackground, 
          Image, Dimensions, StyleSheet } from 'react-native';
import axios from 'axios';
          
const screen = Dimensions.get("screen");
const LoginButton = '#84ba5b';
const TitleColor = '#142949';

const Rectangle = () => {
  return <View style={styles.rectangle} />;
};

let user = '';
let pass = '';

const handleUser = (text) => {
  user = text;
}

const handlePass = (text) => {
  pass = text;
}


const LoginActivity = ({ navigation }) => {
  
  const postCall = () => {
    axios
      .post('https://app.swaggerhub.com/apis/group20/Group20Stonks/1.0.0#/Users/Login', {
        "Login": user,
        "Password": pass
      })
      .then(function (response) {
        let res = response.data;
        alert(res);
      })
      .catch(function (error) {
        // handle error
        alert(error);
      });
  };



  return (
    <View style={styles.container}>
      <Rectangle></Rectangle>
      <Image style={styles.image} source={require('../assets/astronaut.png')}></Image>
      <Image style={styles.title_image} source={require('../assets/oof3.png')}></Image>

      <View style={styles.text}>
        <Text
          style={styles.login}>Login</Text>
          
        <Text numberOfLines={3}></Text>

        <TextInput
          style={styles.textBox}
          placeholder="Enter username"
          placeholderTextColor='black'
          onChangeText = {handleUser}
          />

        <Text numberOfLines={3}></Text>

        <TextInput
          style={styles.textBox}
          placeholder="Enter password"
          placeholderTextColor='black'
          onChangeText = {handlePass}/>

        <Text numberOfLines={3}></Text>
        <Button color={LoginButton} title=" Login " onPress={postCall} />

        <Text numberOfLines={1}></Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.new}>New? </Text>
          <Text style={styles.signup} onPress= {() => navigation.navigate('Signup')}>Sign up here.</Text>
        </View>
      </View>
    </View>
  )
}


  const styles = StyleSheet.create({

    container: {
      alignItems: 'center',
      top: '8%'
    },
    
    title: {
      fontSize: 50,
      top: '70%',
      position: 'absolute',
      color: TitleColor,

    },
    
    text: {
      top: '110%',
    },

    rectangle: {
      width: screen.width / 1.25,
      height: (screen.height / 10) * 8,
      backgroundColor: "grey",
      opacity: 0.4,
      borderRadius: 50,
      position: 'absolute'

    },

    image: {
      top: '-19.6%',
      left: '20%',
      width: '80%',
      height: '100%',
      resizeMode: 'contain',
      position: 'absolute'
    },

    title_image: {
      top: '-75%',
      left: '-105%',
      width: '300%',
      height: '350%',
      resizeMode: 'contain',
      position: 'absolute'
    },

    login: {
      fontSize: 30,
      color: 'black',
    },

    signup: {
      color: 'black',
      textDecorationLine: 'underline',
      fontSize: screen.height / 50
    },

    new: {
      color: 'black',
      fontSize: screen.height / 50
    },

    textBox: {
      height: 30, width: 250, backgroundColor: 'white', 
      paddingLeft: 10
    },
  });

  export default LoginActivity;