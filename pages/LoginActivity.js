import React, { useState } from 'react';
import {
  Text, View, Button, TextInput, ImageBackground,
  Image, Dimensions, StyleSheet, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const screen = Dimensions.get("screen");
const LoginButton = '#84ba5b';
const TitleColor = '#142949';
const TextColor = 'silver';
let global_user = '';

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
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/auth/login', {
        "Login": user,
        "Password": pass
      })
      .then(function (response) {
        global_user = user;
        navigation.navigate('Home');
      })
      .catch(function (error) {
        // handle error
        alert(error);
      });
  };



  return (

      <LinearGradient
          colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
          style={styles.background}
          start={{ x: 0.1, y: 0.1 }}>
      <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
        <Image style={styles.image} source={require('../assets/astronaut.png')}></Image>
        <Image style={styles.title_image} source={require('../assets/oof3.png')}></Image>
        <View style={styles.text}>
          {/*<Text style={styles.name}>StockHub</Text>*/}

          <TextInput
            style={styles.textBox}
            placeholder="Enter username"
            placeholderTextColor='silver'
            onChangeText={handleUser}
          />

          <Text numberOfLines={1}></Text>

          <TextInput
            style={styles.textBox}
            placeholder="Enter password"
            placeholderTextColor='silver'
            onChangeText={handlePass} />
          <Text numberOfLines={1}></Text>

          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: TextColor}}>Forgot your password? </Text>
            <Text style={{fontSize: 14, color: TextColor, textDecorationLine: 'underline'}} onPress={() => navigation.navigate('Signup')}>Reset it here.</Text>
          </View>

          <Text numberOfLines={1}></Text>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Home")}>
          <LinearGradient
                colors={['rgba(22,48,79,0.8)', 'rgba(61,152,172,0.8)']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.gradient}>
              <Text style={{color: TextColor, top: 3, fontSize: 25}}>Log in</Text>
          </LinearGradient>
          </TouchableOpacity>

          <Text numberOfLines={1}></Text>

          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 14, color: TextColor}}>New? </Text>
            <Text style={{fontSize: 14, color: TextColor, textDecorationLine: 'underline'}} onPress={() => navigation.navigate('Signup')}>Sign up here.</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({

  background: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  image: {
    flex: 3,
    top: 5,
    resizeMode: 'center',
  },
  
  title_image: {
    flex: 1/2,
    top: '-2%',
    resizeMode: 'contain',
  },

  text: {
    alignItems: 'center',
    flex: 3
  },


  signup: {
    flex: 1,
    color: TextColor,
    textDecorationLine: 'underline',
    fontSize: screen.height / 50
  },

  new: {
    color: TextColor,
    fontSize: screen.height / 50
  },

  textBox: {
    height: 40, width: 250, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1,
    paddingLeft: 10, borderRadius: 20, color: TextColor, fontSize: 20, textAlign: 'center'
  },

  button: {
    borderRadius: 20,
    width: 150,
    height: 40,
    alignItems: 'center'
  },

  gradient: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },

  name: {
    fontSize: 30,
    color: TextColor,
    paddingBottom: 20
  },
});

export {global_user};
export default LoginActivity;