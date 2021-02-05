import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginView from './components/login/LoginView';

export default function App() {
  return (
    <View style={containerStyle.container}>
      <View style={childStyle.container}>
      <LoginView/>
      </View>
    </View>
  );
}

const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbdfc8',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const childStyle = StyleSheet.create({
  container: {
    margin: 30,
    // alignItems: 'flex-start',
  }
})

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