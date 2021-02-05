import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginView from './components/login/LoginView';
import RegisterScreen from './components/register/RegisterScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name='LoginView'
            component={LoginView}
            options={{ 
              title: 'Login',
              headerStyle: {
                backgroundColor: '#009999',
              }, }}
          />
        <Stack.Screen
          name='RegisterScreen'
            component={RegisterScreen}
            options={{ 
              title: 'Register',
              headerStyle: {
                backgroundColor: '#009999',
              }, 
            }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
      flex: 1, 
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
  },

  text_footer: {
      color: "#008891",
      fontWeight: "bold",
      fontSize: 18,
  },

  textInput: {
      flex: 1,
      marginTop: 20,
      paddingLeft: 10, 
      fontSize: 14,
  },

  remember:{
      padding: 5,
      fontWeight: "bold",
      color: "#008891",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
  },

  login_button: {
      width: "50%",
      borderRadius: 10,
      height: 40,
      alignItems: "center",
      marginTop: 35,
      justifyContent: "center",
      backgroundColor: "#008891",
      marginHorizontal: 70

  },

  loginText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",

  },

  forgot_button: {
      height: 30,
      marginBottom: 30,
      marginTop: 20,
      marginHorizontal: 90
  }

})