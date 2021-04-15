import React, { useState } from 'react';
import {
  Text, View, Button, TextInput, ImageBackground,
  Image, Dimensions, StyleSheet, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';

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

let email = '';

const handleEmail = (text) => {
  email = text;
}


const LoginActivity = ({ navigation }) => {
  const [passwordModal, setPasswordModalVisible] = useState(false);
  const togglePasswordModal = () => {
    setPasswordModalVisible(!passwordModal);
  };
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
  const ResetPassCall = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/auth/recover', {
        "Email": email
      })
      .then(function (response) {
        togglePasswordModal();
      })
      .catch(function (error) {
        // handle error
        alert(error);
      });
  };


  return (

      <LinearGradient
          colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
          style={styles.background}>
      <View style={{flex: 1, alignItems: 'center', alignContent: 'center'}}>
        <Image style={styles.image} source={require('../assets/astronaut.png')}></Image>
        <Image style={styles.title_image} source={require('../assets/oof3.png')}></Image>
        <View style={styles.text}>

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
            <Text style={{fontSize: 14, color: TextColor, textDecorationLine: 'underline'}} onPress={togglePasswordModal}>Reset it here.</Text>
          </View>
          <View >
          <Modal isVisible={passwordModal}>
            <View style={styles.reset_confirm}>
              <Text style={{fontSize: 21, width: '90%', left: '5%', top: 5}}>Please enter your email address.</Text>
              <View style={styles.arrange}>
              <TextInput
                style={styles.modalTextBox}
                placeholder="Enter email"
                placeholderTextColor='silver'
                onChangeText={handleEmail} />
              <Button onPress={ResetPassCall} title="submit"/>
              <Button onPress={togglePasswordModal}title="close"/>
              </View>
            </View>
          </Modal>
        </View>

          <Text numberOfLines={1}></Text>
          <TouchableOpacity style={styles.button} onPress={postCall}>
          <LinearGradient
                colors={['rgba(22,48,79,0.8)', 'rgba(61,152,172,0.8)']}
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

  resetPass: {
    height: '100%',
    backgroundColor: 'white'
  },
  reset_confirm: {
    backgroundColor: 'white',
    height: (screen.height / 10) * 1.5,
    top: '30%',
    borderRadius: 20,
  },

  reset_button: {
    width: '40%',
    height: '120%',
    alignItems: 'center',
    backgroundColor: '#43B1D3',
  },

  reset_button_text: {
    fontSize: 30,
    color: 'black',
    paddingTop: 4
  },

  arrange: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '5%'
  },

  modalTextBox: {
    height: 40, width: 200, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1,
    paddingLeft: 10, borderRadius: 20, color: TextColor, fontSize: 20, textAlign: 'center'
  },

});

export {global_user};
export default LoginActivity;