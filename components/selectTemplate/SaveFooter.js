import React from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from 'react-native';

export default function SaveFooter({uri}) {
        
    
        
        return (
            <TouchableOpacity style={styles.footer}
            onPress={async() => {
                
                var d = new Date();
                const user = auth().currentUser
                const filename = user.uid + '/' + Date.now() + '.jpg'
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                
                const task = storage()
                    .ref(filename)
                    .putFile(uploadUri);
                
                try {
                    await task;
                } catch (e) {
                    console.error(e);
                }
                Alert.alert(
                    'Photo uploaded!',
                    'Your photo has been uploaded to Firebase Cloud Storage!'
                );
            }
            }>
            <Text style={styles.loginText}>Save</Text>
            
        </TouchableOpacity>
        );
    
}

const styles = StyleSheet.create({ 
    
    footer: {
      borderRadius: 10,
      height: 80,
      alignItems: "center",
      marginBottom: 0,
      justifyContent: "center",
      backgroundColor: "#008891",
      marginHorizontal: 70,
      marginTop: 10,
      width: 600
    },
    loginText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    },


});