import React from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';


const LoginActivity = ({ navigation }) => {
    return (
      <View
        style={styles.container}>
        <Text
          style={styles.login}>Login</Text>
          
        <Text numberOfLines={3}></Text>

        <TextInput
          style={{height: 30, width: 250, backgroundColor: 'white', 
          alignContent: 'center', paddingLeft: 10}}
          placeholder="Username"
          placeholderTextColor='black'/>

        <Text numberOfLines={3}></Text>

        <TextInput
          style={{height: 30, width: 250, backgroundColor: 'white', 
          alignContent: 'center', paddingLeft: 10}}
          placeholder="Password"
          placeholderTextColor='black'/>

        <Text numberOfLines={3}></Text>
        <Button title="click here" onPress={() => navigation.navigate('Signup')} />
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:'20%',
      alignItems: "center",
      backgroundColor:'#8C8C8C',

    },
    login: {
      fontSize: 30,
      color: 'white',
    }
  });

  export default LoginActivity;