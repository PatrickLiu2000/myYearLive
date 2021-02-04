import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginView from './components/login/LoginView';
import auth from '@react-native-firebase/auth';

function LoginApp() {
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
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={containerStyle.container}>
      <View style={childStyle.container}>
        <LoginApp/>
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

