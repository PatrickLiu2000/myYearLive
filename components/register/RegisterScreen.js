import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

export default class RegisterScreen extends React.Component {
    render() {
        return (
            <View style={styles.RegisterScreen}>
                <Text style={styles.header}>Create an Account</Text>

                <TextInput style ={styles.textinput} placeholder = "Name"
                underlineColorAndroid={'transparent'} />

                <TextInput style ={styles.textinput} placeholder = "Email Address"
                underlineColorAndroid={'transparent'} />

                <TextInput style ={styles.textinput} placeholder = "Create a Password"
                secureTextEntry = {true} underlineColorAndroid={'transparent'} />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.btntext}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2}>
                    <Text style={styles.btntext2}>Log in with existing account</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    RegisterScreen: {
        alignSelf : 'stretch',
    },

    header: {
        fontSize: 30,
        color: '#008891', // font color
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#008891', // this is supposed to be a line but doesn't show up on sim
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#008891',
        borderBottomColor: '#f0f0f5',
        borderBottomWidth: 1,
    },
    button : {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#008891",
        marginTop: 30,
    },
    btntext : {
        color: "#fff",
        fontWeight: 'bold',
    },
    button2: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 24,
        padding: 10,
        backgroundColor: '#bbdfc8',
    },
    btntext2 : {
        color: "#808080",
        fontWeight: 'bold',
    }


});