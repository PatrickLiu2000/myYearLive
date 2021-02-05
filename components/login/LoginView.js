import React, { Component, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';
import { 
    Platform,
    Button, 
    Text, 
    TextInput, 
    View, 
    StyleSheet,
    TouchableOpacity, 
    CheckBox,
    Switch,
    Alert} from 'react-native';
    
async function onEmailSignInButton(email, password) {
    console.log(email, password)
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
        console.log('User account created & signed in!');
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        }
    
        console.error(error);
    });
}

async function signOut() {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}




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

export default function LoginView() {

    //TESTING if email/password is invalid 
    const [data, setData] = React.useState({
        email: '',
        password: '',
    })

    const loginHandle = (email, password) => {
        if (data.email.length == 0 || data.password.length == 0){
            Alert.alert("Email or password is invalid.", [{text: "Okay"}] );
            return;
        }

        if(data.email.length >= 20 || data.password.length >= 20){
            Alert.alert("Email or password cannot be longer than 20 characters", [{text: "Okay"}] );
            return;
        }
    }


    // EMAIL/PASS 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //REMEMBER ME
    const [remember, setRemember] = useState(false);

    const onRememberMe = () => {
        setRemember(!remember);
    }


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

    //Navigation
    const navigation = useNavigation();

    if (initializing) return null;

    if (!user) {
        return (
        <View style={containerStyle.container}> 
            <View style={childStyle.container}> 
            {/* FILL IN EMAIL  */}
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Email</Text>
            </View>

            <View>
                <TextInput
                style={styles.TextInput}
                placeholder="Your Email"
                autoCapitalize = "none"
                // placeholderTextColor="#003F5C"
                onChangeText={(email) => setEmail(email)}
                />
            </View>

            {/*PASSWORD*/}
            <View style={[styles.footer, {marginTop: 35}]}>
                <Text style={styles.text_footer}>Password</Text>
            </View>

            <View>
                <TextInput
                style={styles.TextInput}
                placeholder="Your Password"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
                />
            </View>

        {/*REMEMBER CHECKBOX*/}
        
            <View style={{flexDirection: 'row', padding: 35, paddingLeft: 0}}>
                { Platform.OS === 'ios' ? <Switch value={remember} onValueChange={() => onRememberMe(remember)}/> : <CheckBox value={remember} onValueChange={() => onRememberMe(remember)}/> }
                <Text style={styles.remember}> Remember Me</Text>
            </View>


            {/*LOGIN BUTTON*/}
            <TouchableOpacity
                style={styles.login_button}
                onPress={() => onEmailSignInButton(email, password).then(() => console.log('Signing in...'))}
                >
                    <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>


            {/*FORGOT PASS*/}
            <TouchableOpacity>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
                style={styles.login_button}>
                    <Text style={styles.loginText}>Google Log In</Text> 
            </TouchableOpacity>


            
            <TouchableOpacity
                title="Register"
                onPress={() =>
                    navigation.navigate('RegisterScreen')
                    }
                style={styles.login_button}>
                    <Text style={styles.loginText}>Don't have an account? Register here</Text> 
            </TouchableOpacity>
            
        </View>   
        </View>   
        )
    }

    return (
        <View style={containerStyle.container}>
          <Text style={styles.remember}>Welcome {user.email}</Text>
          <TouchableOpacity
                title="Sign Out"
                onPress={() => signOut().then(() => console.log('Signing out'))}
                style={styles.login_button}>
                    <Text style={styles.loginText}>Sign Out</Text> 
            </TouchableOpacity>
        </View>
      );
};

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
          marginLeft: 30
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
