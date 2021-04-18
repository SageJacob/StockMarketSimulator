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
const TextColor = 'white';
let global_user = '';

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
let token = '';
let newPass = '';

const handleToken = (text) => {
  token = text;
}

const handleNewPass = (text) => {
  newPass = text;
}

let confirmPass = '';

const handleConfirmPass = (text) => {
  confirmPass = text;
}



const LoginActivity = ({ navigation }) => {
  const [passwordModal, setPasswordModalVisible] = useState(false);
  const togglePasswordModal = () => {
    setPasswordModalVisible(!passwordModal);
  };
  const [tokenModal, setTokenModal] = useState(false);
  const toggleTokenModal = () => {
    setTokenModal(!tokenModal);
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
        alert('There was an error.');
      });
  };
  const ResetPassCall = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/auth/recover', {
        "Email": email
      })
      .then(function (response) {
        togglePasswordModal();
        toggleTokenModal();
      })
      .catch(function (error) {
        // handle error
        alert('There was an error.');
      });
  };
  const tokenPassCall = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/auth/reset/'.concat(token), {
        "Password": newPass,
        "ConfirmPassword": confirmPass
      })
      .then(function (response) {
        toggleTokenModal();
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
      <View style={{flex: 1, alignItems: 'center', alignContent: 'center', top: '10%'}}>
        <Image style={styles.image} source={require('../assets/logo.png')}></Image>
        <Image style={styles.title_image} source={require('../assets/title.png')}></Image>
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
              <View style={styles.ModalLocation}>
                <Text style={styles.ModalText}>Please enter your email address.</Text>
                <TextInput
                  style={styles.modalTextBox}
                  placeholder="Enter email"
                  placeholderTextColor='silver'
                  onChangeText={handleEmail} />
                <View style={styles.arrange}>
                  <TouchableOpacity style={styles.ModalButton} onPress={ResetPassCall}>
                    <Text style={{color: TextColor, fontSize: 25, top: 2}}>submit</Text>
                  </TouchableOpacity>
                  <Text style={{color: 'rgb(92,92,92)', paddingRight: 20} }>.</Text>
                  <TouchableOpacity style={styles.ModalButton} onPress={togglePasswordModal}>
                    <Text style={{color: TextColor, fontSize: 25, top: 2}}>cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View >
          <Modal isVisible={tokenModal}>
            <View style={styles.reset_Token_confirm}>
              <View style={styles.ModalTokenLocation}>
                <Text style={styles.ResetModalText}>Enter Token</Text>
                <TextInput
                  style={styles.modalResetTextBox}
                  placeholder="Enter token"
                  placeholderTextColor='silver'
                  onChangeText={handleToken} />
                <Text style={styles.ResetModalText}>New Password</Text>
                <TextInput
                  style={styles.modalResetTextBox}
                  placeholder="Enter password"
                  placeholderTextColor='silver'
                  onChangeText={handleNewPass} />
                <Text style={styles.ResetModalText}>Confirm Password</Text>
                <TextInput
                  style={styles.modalResetTextBox}
                  placeholder="Confirm password"
                  placeholderTextColor='silver'
                  onChangeText={handleConfirmPass} />
                <View style={styles.tokenArrange}>
                  <TouchableOpacity style={styles.ModalTokenButton} onPress={tokenPassCall}>
                    <Text style={styles.ModalTokenText}>submit</Text>
                  </TouchableOpacity>
                  <Text style={{color: 'rgb(92,92,92)', paddingRight: 20} }>.</Text>
                  <TouchableOpacity style={styles.ModalTokenButton} onPress={toggleTokenModal}>
                    <Text style={styles.ModalTokenText}>cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>

          <Text numberOfLines={1}></Text>
          <TouchableOpacity style={styles.button} onPress={postCall}>
              <Text style={{color: TextColor, top: 3, fontSize: 25}}>Log in</Text>
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
    flex: 1.75,

    resizeMode: 'center',
  },
  
  title_image: {
    flex: 1/2,
    top: '0%',
    resizeMode: 'contain',
  },

  text: {
    alignItems: 'center', flex: 3, top: '0%'
  },


  signup: {
    flex: 1, color: TextColor, textDecorationLine: 'underline', fontSize: screen.height / 50
  },

  new: {
    color: TextColor, fontSize: screen.height / 50
  },

  textBox: {
    height: 40, width: 250, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1,
    paddingLeft: 10, borderRadius: 20, color: TextColor, fontSize: 20, textAlign: 'center'
  },

  button: {
    borderRadius: 20, width: 150, height: 40, alignItems: 'center', backgroundColor: 'rgb(24,104,217)'
  },

  gradient: {
    borderRadius: 20, width: '100%', height: '100%', alignItems: 'center'
  },

  resetPass: {
    height: '100%', backgroundColor: 'white'
  },
  
  reset_button: {
    width: '40%', height: '120%', alignItems: 'center', backgroundColor: '#43B1D3',
  },
  
  reset_button_text: {
    fontSize: 30, color: 'black', paddingTop: 4
  },
  
  arrange: {
    flexDirection: 'row', width: '100%', justifyContent: 'center', top: 20
  },
  reset_confirm: {
    backgroundColor: 'rgb(92,92,92)', height: (screen.height / 10) * 5, borderRadius: 10,
  },

  modalTextBox: {
    height: '17%', width: '90%', backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1,
    paddingLeft: 10, borderRadius: 20, color: 'white', fontSize: 20, textAlign: 'center',
  },

  ModalLocation: {
    top: 10, alignItems: 'center',
  },

  ModalText: {
    fontSize: 30, width: '80%', color: 'white', paddingBottom:'15%'
  },

  ModalButton: {
    backgroundColor: 'rgb(24,104,217)',
    borderRadius: 20,
    width: '40%',
    height: '125%',
    top: 20,
    alignItems:'center',
  },

  ModalImage: {
    height: '15%',
    width: '10%',
    left: '44%',
    top: '17%'
  },

  ModalTokenLocation: {
    borderRadius: 20,
    left: 10,
    flex: 1
  },

  ModalTokenButton: {
    height: '100%',
    backgroundColor: 'rgb(24,104,217)',
    width: '40%',
    borderRadius: 20,
    paddingTop: 10,
    
  },

  reset_Token_confirm: {
    backgroundColor: 'rgb(92,92,92)', height: (screen.height / 10) * 5, borderRadius: 10,
  },

  ResetModalText: {
    color: 'white',
    fontSize: 20,
    left: 10,
    marginTop: 10,
    marginBottom: 3
  },

  modalResetTextBox: {
    height: '14%', width: '90%', backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1,
    paddingLeft: 10, borderRadius: 20, color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 5,
  },
  tokenArrange: {
    flexDirection: 'row', justifyContent: 'center', top: 20, left: '-4%'
  },

  ModalTokenImage: {
    height: '15%',
    width: '10%',
    left: '42%',
    top: '-3%'
  },

  ModalTokenText: {
    color: TextColor, fontSize: 25, top: -5, left: '20%'
  },

});

export {global_user};
export default LoginActivity;