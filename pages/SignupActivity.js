import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';


const SignupActivity = ({ navigation }) => {
    return (
      <View
        style={styles.container}>
        <Text
          style={styles.login}>Signup</Text>
        <Button title="click here" onPress={() => navigation.navigate('Login')} />
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
    }
  });

  export default SignupActivity;