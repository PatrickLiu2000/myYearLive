import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import LoginView from './components/login/LoginView';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '118502184356-0j38lkdstkbiqvq0d2hlpfcn9dj9fsbl.apps.googleusercontent.com',
});
async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default function App() {
  return (
    <View style={containerStyle.container}>
      <View style={childStyle.container}>
      <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      />
        <LoginView/>
      </View>
    </View>
  );
}

const containerStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbdfc8',
    //alignItems: 'center',
    justifyContent: 'center'
  },
});

const childStyle = StyleSheet.create({
  container: {
    margin: 30,
    // alignItems: 'flex-start',
  }
})

