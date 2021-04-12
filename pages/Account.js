import React, {useState} from 'react';
import { Text, StyleSheet, View, 
  TouchableOpacity, Button } from 'react-native';

let backgroundColor;
let textColor;
let underline;

let toggle = true;
const light = {
  textColor: 'black',
  underline: 'black',
  backgroundColor: '#f1eff1'
};

const dark = {
  textColor: 'white',
  underline: 'white',
  backgroundColor: 'black'
}; 

const changeColor = () => {
  alert('hi');
  if (toggle == light)
  toggle = dark;
  else
  toggle = light;
  alert(toggle);
  return
   toggle;
}

const Account = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText}> Reset Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText} onPress={()=>{toggle= !toggle}}> Dark/Light mode</Text>
            {/*toggle==light ? toggle=dark : toggle=light*/}
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText}> Change Password</Text>
        </TouchableOpacity>
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
    backgroundColor: toggle ? light.backgroundColor : dark.backgroundColor,
    height: '100%'
  },
  list: {
    top: '5%'
  },

  btnText: {
    fontSize: 30,
    color: toggle ? light.textColor : dark.textColor,
  },

  buttons: {
    paddingTop: '5%',
    marginBottom: '1%',
    width: '80%',
    left: '10%',
    borderBottomColor: toggle ? light.underline : dark.underline,
    borderBottomWidth: 2,
  },


});