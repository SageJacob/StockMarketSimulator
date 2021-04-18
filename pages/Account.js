import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput,
  TouchableOpacity, Button, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { global_user } from './LoginActivity';
import { LinearGradient } from 'expo-linear-gradient';
let backgroundColor = '#f1eff1';
let textColor = 'black';
let underline = 'black';
let TextColor = 'white';
const screen = Dimensions.get("screen");

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


const Account = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [passwordModal, setPasswordModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const togglePasswordModal = () => {
    setPasswordModalVisible(!passwordModal);
  };
  const [tokenModal, setTokenModal] = useState(false);
  const toggleTokenModal = () => {
    setTokenModal(!tokenModal);
  };
  const ResetBalCall = () => {
    axios
      .post('https://group20-stocksimulatorv2.herokuapp.com/api/portfolios/bankrupt', {
        "Login": global_user
      })
      .then(function (response) {
        toggleModal();
        alert("Success");
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
        toggleTokenModal();
      })
      .catch(function (error) {
        // handle error
        alert(error);
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
          style={styles.container}>
      <View style={styles.container}>
        <View style={styles.list}>
          <TouchableOpacity style={styles.buttons} onPress={toggleModal}>
              <Text style={styles.btnText}> Reset Balance</Text>
          </TouchableOpacity>

          <View >
            <Modal isVisible={isModalVisible}>
              <View style={styles.reset_confirm}>
                <View style={styles.ModalLocation}>
                  <Text style={styles.ModalResetText}>Are you sure you want to reset your balance? Your current portfolio will be deleted and your balance will reset to $10,000</Text>
                  <View style={styles.arrange}>
                    <TouchableOpacity style={styles.ModalButton} onPress={ResetBalCall}>
                      <Text style={{color: TextColor, fontSize: 25, top: 2}}>submit</Text>
                    </TouchableOpacity>
                    <Text style={{color: 'rgb(92,92,92)', paddingRight: 20} }>.</Text>
                    <TouchableOpacity style={styles.ModalButton} onPress={toggleModal}>
                      <Text style={{color: TextColor, fontSize: 25, top: 2}}>cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <TouchableOpacity style={styles.buttons} onPress={togglePasswordModal}>
              <Text style={styles.btnText}> Change Password</Text>
          </TouchableOpacity>
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
          
          <TouchableOpacity style={styles.buttons}>
              <Text style={styles.btnText} onPress={()=>navigation.navigate('Login')}> Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Account;
const styles = StyleSheet.create({

  container: { 
    alignContent: 'center',
    height: '100%'
  },
  list: {
    top: '5%'
  },

  btnText: {
    fontSize: 30,
    color: textColor,
  },

  buttons: {
    paddingTop: '5%',
    marginBottom: '1%',
    width: '80%',
    left: '10%',
    borderBottomColor: underline,
    borderBottomWidth: 2,
  },

  reset_confirm: {
    backgroundColor: 'white',
    height: (screen.height / 10) * 3,
  },

  reset_button: {
    width: '40%',
    height: '120%',
    alignItems: 'center',
    backgroundColor: '#43B1D3',
  },

  reset_button_text: {
    fontSize: 30,
    color: textColor,
    paddingTop: 4
  },

  arrange: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: '5%'
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

  ModalResetText: {
    fontSize: 25, width: '80%', color: 'white'
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