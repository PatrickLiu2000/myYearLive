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
export default function SaveFooter({images, page, descriptions}) {

    const addImage = (userDoc, images, doc) => {
        let pagesList = doc._data.pages
        pagesList[page.id].images = images
        pagesList[page.id].background = page.background
        pagesList[page.id].descriptions = descriptions
        pagesList[page.id].url = page.url
        userDoc.update({
            pages: pagesList
        })
    }
        
    const savePage = async () => {

        const user = auth().currentUser
        var imageURLs = []
        var topRef = await storage().ref("")
        var storageRef = await storage().ref(user.uid + "/" + page.id + "/")
        var filesList = await storageRef.listAll()
        var filesInStorage = filesList["items"]
        
        for (var i = 0; i < images.length; i++) {
            if (typeof(images[i]) === 'undefined') continue;
            const uploadUri = Platform.OS === 'ios' ? images[i].replace('file://', '') : images[i];
            var suffix = uploadUri.split("/")
            suffix = suffix[suffix.length - 1]
            const filename = user.uid + '/' + page.id + "/" + suffix
            imageURLs.push({
                "url": suffix,
                "description": descriptions[i]

            })
            
            const task = storage()
                .ref(filename)
                .putFile(uploadUri);
            
            try {
                await task;
            } catch (e) {
                console.error(e);
            }
        }
        for (var j = 0; j < filesInStorage.length; j++) {
            if (imageURLs.indexOf(filesInStorage[j]["path"]) < 0) {
                var delRef = topRef.child(filesInStorage[j]["path"])
                delRef.delete().then(() => {
                    console.log('Deleted')
                  }).catch((error) => {
                    console.log(error)
                  });
            }
        }

        
        var userDoc = await firestore().collection('users').doc(user.uid)
        userDoc.get().then((doc) => {
            if (doc.exists) {
                addImage(userDoc, imageURLs, doc)
                
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
      } 
        
        return (
            <TouchableOpacity style={styles.footer}
                onPress={() => savePage()}>
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