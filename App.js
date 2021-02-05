import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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

function Login() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Invalid User!</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style = {styles.remember}>Welcome {user.email}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={containerStyle.container}>
      <View style={childStyle.container}>
      <Login/>
      <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
      style={styles.login_button}/>
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