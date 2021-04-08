import React from 'react';
import { Text, StyleSheet, View, 
  TouchableOpacity, Button } from 'react-native';

const backgroundColor = '#f1eff1';
const textColor = 'black';
const underline = 'black';

const Account = () => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText}> Reset Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText}> Dark/Light mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText}> Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
            <Text style={styles.btnText}> Sign out</Text>
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
  
  underline: {
    width: '80%',
  },
});