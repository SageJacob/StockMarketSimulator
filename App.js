import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button, StyleSheet } from 'react-native';
import SignupActivity from './pages/SignupActivity';
import LoginActivity from './pages/LoginActivity';
import Home from './pages/Home';

const Stack = createStackNavigator();
const App = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login">
        
        <Stack.Screen
          name="Signup"
          component={SignupActivity}
          options={{ title: 'Welcome', headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginActivity}
          options={{headerShown: false}} />
        <Stack.Screen
          name = "Home"
          component = {Home}
          options = {{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


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

export default App;