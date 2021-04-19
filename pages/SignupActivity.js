import React, {useState} from 'react';
import { Text, View, Button, TextInput, StyleSheet, 
          Dimensions, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const screen = Dimensions.get("screen");
const backColor       =   'white';
const textBoxColor    =   'white';
const textColor       =   'silver';
const titleColor      =   '#142949';
const buttonColor     =   '#84ba5b';
const buttonText      =   'white';
const registerColor   =   'silver';
const TextColor = 'white';



const SignupActivity = ({ navigation }) => {
    const postCall = () => {
      axios
        .post('https://group20-stocksimulatorv2.herokuapp.com/api/auth/register', {
        "FirstName": first,
        "LastName": last,
        "Email": email,
        "Login": user,
        "Password": pass,
        "Password2": confirm
      })
        .then(function (response) {
          alert('Success! Please check your email for verification.');
        })
        .catch(function (error) {
          // handle error
          alert('There was an issue during registration.');
        });
    };
    let [first, onChangeFirst] = React.useState(null);
    let [last, onChangeLast] = React.useState(null);
    let [email, onChangeEmail] = React.useState(null);
    let [user, onChangeUser] = React.useState(null);
    let [pass, onChangePass] = React.useState(null);
    let [confirm, onChangeConfirm] = React.useState(null);
    let arr1 = [first, last, email, user, pass, confirm];
    let arr2 = [onChangeFirst, onChangeLast, onChangeEmail, onChangeUser, onChangePass, onChangeConfirm];
    let placeholders = ['First name', 'Last name', 'Email', 'Username', 
                        'Password', 'Confirm Password'];

    let components = [];
    for (let i = 0; i < placeholders.length; i++)
      components.push(
        <View key={i}>
        <TextInput
          style={styles.textBox}
          placeholder={placeholders[i]}
          placeholderTextColor={'silver'}
          onChangeText={arr2[i]}
          value={arr1[i]}
        />
        <Text numberOfLines={1}></Text>
        </View>
      );

    return (
      <LinearGradient
          colors={['rgba(  0, 92, 222   ,0.9)', 'rgba(  0, 0, 0 ,0.9)']}
          style={styles.container}>
      <View
        style={styles.container}>
          <Image style={styles.title_image} source={require('../assets/title.png')}></Image>

          <View style={styles.elements}>


            {components}

            <TouchableOpacity
              style={styles.create}
              onPress={postCall}
            >

            <Text style={styles.btnText}> Create Account</Text>

            </TouchableOpacity>
            <Text numberOfLines={1}></Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.new}>Already have an account? </Text>
              <Text style={styles.signup} onPress= {() => navigation.navigate('Login')}>Log in here.</Text>
            </View>
          </View>
      </View>
      </LinearGradient>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, alignItems: "center",
    },
    elements: {
      top: '10%',
      alignItems: 'center'
    },
    title: {
      top: '15%', fontSize: 50, color: titleColor
    },
    login: {
      fontSize: 30, color: registerColor,
    },
    textBox: {
      height: 40, width: 250, backgroundColor: 'transparent', borderColor: 'black', borderWidth: 1,
      paddingLeft: 10, borderRadius: 20, color: TextColor, fontSize: 20, textAlign: 'center'
    },
    title_image: {
      flex: 1/3,
      top: '10%',
      resizeMode: 'contain',
    },
    create: {
      borderRadius: 20,
      width: 150,
      height: 40,
      alignItems: 'center',
      backgroundColor: 'rgb(24,104,217)'
    },
    btnText: {
      color: 'silver', top: 7, fontSize: 18, left: -3
    },
    signup: {
      color: 'silver',
      textDecorationLine: 'underline',
      fontSize: screen.height / 50
    },

    new: {
      color: 'silver',
      fontSize: screen.height / 50
    },
  });

  export default SignupActivity;