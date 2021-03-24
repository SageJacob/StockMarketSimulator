import React from 'react';
import { Text, View, Button, TextInput, ImageBackground, 
          Dimensions, StyleSheet } from 'react-native';
          
const screen = Dimensions.get("screen");

const Rectangle = () => {
  return <View style={styles.rectangle} />;
};


const LoginActivity = ({ navigation }) => {
    return (
      <View>
        <ImageBackground
          source={require('../assets/wheat.png')}
          style={styles.image}>

          <View
            style={styles.container}>
              <Rectangle></Rectangle>
              <Text
                style={styles.login}>Login</Text>
                
              <Text numberOfLines={3}></Text>

              <TextInput
                style={styles.textBox}
                placeholder="Username"
                placeholderTextColor='black'/>

              <Text numberOfLines={3}></Text>

              <TextInput
                style={styles.textBox}
                placeholder="Password"
                placeholderTextColor='black'/>

              <Text numberOfLines={3}></Text>
              <Button title=" Login " onPress={() => navigation.navigate('Home')} />

              <Text numberOfLines={1}></Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white'}}>New? </Text>
                <Text style={styles.signup} onPress= {() => navigation.navigate('Signup')}>Sign up here.</Text>
              </View>
          </View>
        </ImageBackground>
      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingTop: screen.height / 3
      
    },
    rectangle: {
      width: screen.width / 1.5,
      height: screen.height / 2,
      top: '100%',
      alignContent: 'center',
      backgroundColor: "grey",
      opacity: 0.5,
      position: 'absolute'

    },
    image: {
      width:'100%',
      height:'100%',
    },
    login: {
      fontSize: 30,
      color: 'white',
    },
    signup: {
      color: 'white',
      textDecorationLine: 'underline',
      fontSize: screen.height / 50
    },
    textBox: {
      height: 30, width: 250, backgroundColor: 'white', 
      paddingLeft: 10
    },
  });

  export default LoginActivity;