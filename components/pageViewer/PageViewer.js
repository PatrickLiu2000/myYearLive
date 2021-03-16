import React from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    View
  } from 'react-native';

export default function PageViewer({route}) {
    let page = route.params
    console.log(page)
    
    const [images, setImages] = React.useState(page.images)
    

    return (
        <View style={styles.container}>
        

        </View>
    )
    
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