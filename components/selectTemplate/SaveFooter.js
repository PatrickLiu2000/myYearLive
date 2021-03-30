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

//   For each image uri, upload to firestore and storage  
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
        const filename = user.uid + '/' + page.id + "/" +Date.now() + '.jpg'
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setImages([...images, filename])

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
      height: 70,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#008891",
      
      position: "absolute",
        bottom: 0,
        right: 0,
        width: 440,
    },
    loginText: {
      fontWeight: "bold",
      fontSize: 18,
      color: "#fff",
    },


});