import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput,
  TouchableOpacity, Button, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { global_user } from './LoginActivity';
let backgroundColor = '#f1eff1';
let textColor = 'black';
let underline = 'black';
const screen = Dimensions.get("screen");

let email = '';

const handleEmail = (text) => {
  email = text;
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
        toggleModal();
      })
      .catch(function (error) {
        // handle error
        alert(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity style={styles.buttons} onPress={toggleModal}>
            <Text style={styles.btnText}> Reset Balance</Text>
        </TouchableOpacity>
        <View >
          <Modal isVisible={isModalVisible}>
            <View style={styles.reset_confirm}>
              <Text style={{fontSize: 25, width: '90%', left: '5%',}}>Are you sure you want to reset your balance? Your old portfolio has been deleted and your balance will reset to $10,000</Text>
              <View style={styles.arrange}>
                <Button onPress={ResetBalCall} title="Yes, reset balance"/>
                <Button onPress={toggleModal}  title="No"/>
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
              <Text style={{fontSize: 25, width: '90%', left: '5%',}}>Please enter your email address to change your password.</Text>
              <View style={styles.arrange}>
              <TextInput
                style={styles.textBox}
                placeholder="Enter password"
                placeholderTextColor='silver'
                onChangeText={handleEmail} />
              <Button onPress={ResetPassCall} title="submit"/>
              <Button onPress={togglePasswordModal}title="close"/>
              </View>
            </View>
          </Modal>
        </View>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText} onPress={()=>navigation.navigate('Login')}> Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Account;
const styles = StyleSheet.create({

  container: { 
    alignContent: 'center',
    backgroundColor: backgroundColor,
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



});