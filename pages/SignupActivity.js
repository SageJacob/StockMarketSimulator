import React, {useState} from 'react';
import { Text, View, Button, TextInput, StyleSheet, 
          Dimensions, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const screen = Dimensions.get("screen");
const backColor       =   'white';
const textBoxColor    =   'white';
const textColor       =   'black';
const titleColor      =   '#142949';
const buttonColor     =   '#84ba5b';
const buttonText      =   'white';
const rectangleColor  =   'grey';
const registerColor   =   'black';

const Rectangle = () => {
  return <View style={styles.rectangle} />;
};


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
          let res = response.data;
          alert(JSON.stringify(res)); 
        })
        .catch(function (error) {
          // handle error
          alert(last);
          alert(error);
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
          placeholderTextColor='black'
          onChangeText={arr2[i]}
          value={arr1[i]}
        />
        <Text numberOfLines={1}></Text>
        </View>
      );

    return (
      <View
        style={styles.container}>
            <Image style={styles.title_image} source={require('../assets/oof3.png')}></Image>
            <Rectangle></Rectangle>

          <View style={styles.elements}>
            <Text
              style={styles.login}>Register</Text>
            <Text numberOfLines={3}></Text>

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
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1, alignItems: "center",
    },
    elements: {
      top: '25%'
    },
    rectangle: {
      width: screen.width / 1.25,
      height: screen.height / 1.25,
      backgroundColor: rectangleColor,
      opacity: 0.4, top: '7%',
      borderRadius: 50, position: 'absolute'
    },
    title: {
      top: '15%', fontSize: 50, color: titleColor
    },
    login: {
      fontSize: 30, color: registerColor,
    },
    textBox: {
      height: 30, width: 250, backgroundColor: textBoxColor, 
      alignContent: 'center', paddingLeft: 10
    },
    title_image: {
      top: '-107%',
      left: '-55%',
      width: '200%',
      height: '255%',
      resizeMode: 'contain',
      position: 'absolute'
    },
    create: {
      backgroundColor: buttonColor, borderRadius: 5,
      height: 30, width: 250, alignItems: "center",
    },
    btnText: {
      fontSize: screen.height / 50,
      color: buttonText, top: 2
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
  });

  export default SignupActivity;