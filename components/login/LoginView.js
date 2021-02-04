import React, { Component, useState } from 'react';
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


    return (
    <View> 
        
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
        <TouchableOpacity style={styles.login_button}>
            <Text style={styles.loginText}>LOG IN</Text>
           
        </TouchableOpacity>


        {/*FORGOT PASS*/}
        <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
        

    </View>   
    )
};
  

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
          color: "#008891"

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
