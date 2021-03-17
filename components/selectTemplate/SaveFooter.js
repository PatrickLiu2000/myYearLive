import React from 'react';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from 'react-native';

export default function SaveFooter({uri, updateImages, page}) {
    const [images, setImages] = React.useState(page.images)

    const addImage = (userDoc, images, doc) => {
        let pagesList = doc._data.pages
        pagesList[page.id].images = images
        pagesList[page.id].background = page.background
        userDoc.update({
            pages: pagesList
        })
    }
        
    const savePage = async (uri) => {
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
        console.log("imagesss")
        setImages([...images, filename])
        console.log(images)

        updateImages(images)
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded!'
        );
        var userDoc = await firestore().collection('users').doc(user.uid)
        userDoc.get().then((doc) => {
            if (doc.exists) {
                addImage(userDoc, images, doc)
                
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      } 
        
        return (
            <TouchableOpacity style={styles.footer}
                onPress={() => savePage(uri)}>
            <Text style={styles.loginText}>Save</Text>
            
        </TouchableOpacity>
        );
    
}

const styles = StyleSheet.create({ 
    
    footer: {
      borderRadius: 10,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#008891",
      marginHorizontal: -40,
      marginTop: 10,
      width: 500
    },
    loginText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    },


});