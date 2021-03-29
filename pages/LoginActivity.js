import React from 'react';
import { Text, View, Button, TextInput, ImageBackground, 
          Image, Dimensions, StyleSheet } from 'react-native';
          
const screen = Dimensions.get("screen");
const LoginButton = '#84ba5b';
const TitleColor = '#142949';

const Rectangle = () => {
  return <View style={styles.rectangle} />;
};




const LoginActivity = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Rectangle></Rectangle>
        <Image style={styles.image} source={require('../assets/astronaut.png')}></Image>
        <Text style={styles.title}>GetTrading</Text>
        <View style={styles.text}>
          <Text
            style={styles.login}>Login</Text>
            
          <Text numberOfLines={3}></Text>

          <TextInput
            style={styles.textBox}
            placeholder="Enter username"
            placeholderTextColor='black'/>

          <Text numberOfLines={3}></Text>

          <TextInput
            style={styles.textBox}
            placeholder="Enter password"
            placeholderTextColor='black'/>

          <Text numberOfLines={3}></Text>
          <Button color={LoginButton} title=" Login " onPress={() => navigation.navigate('Home')} />

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
      top: '7%'
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
      height: screen.height / 1.25,
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