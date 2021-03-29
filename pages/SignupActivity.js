import React from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';



const SignupActivity = ({ navigation }) => {
    let placeholders = ['First name', 'Last name', 'Email', 'Username', 'Password'];
    let components = []
    for (let i = 0; i < placeholders.length; i++)
      components.push(
        <View key={i}>
        <TextInput
          style={styles.textBox}
          placeholder={placeholders[i]}
          placeholderTextColor='black'
        />
        <Text numberOfLines={1}></Text>
        </View>
      );

    return (
      <View
        style={styles.container}>
        <Text
          style={styles.login}>Register</Text>
        <Text numberOfLines={3}></Text>

        {components}

        <Text numberOfLines={3}></Text>
        <Button title="Create account" onPress={() => navigation.navigate('Login')} />
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
      color: '#FFFFFF',
    },
    textBox: {
      height: 30, width: 250, backgroundColor: 'white', 
      alignContent: 'center', paddingLeft: 10
    }
  });

  export default SignupActivity;