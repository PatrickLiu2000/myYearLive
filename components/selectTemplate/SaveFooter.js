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

export default function SaveFooter({uri}) {
    const [userPages, setuserPages] = React.useState([])
    const [images, setImages] = React.useState([])

    const addPage = (userDoc, images) => {
        setuserPages([...userPages, 
        {
            id: userPages.length + 1,
            template: "GradTemplate",
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAY1BMVEX///8AAAAGBgatra3h4eHc3NwNDQ18fHz6+vqUlJT19fW5ubkUFBRZWVkmJiYRERGnp6dSUlJMTExFRUVqampeXl4wMDC6urqxsbFUVFQsLCzZ2dlBQUGioqJ2dnaRkZF/f39xRK95AAACgElEQVR4nO2dW1PCQAxG2V4AKS1QpHJR5P//SmEYx13EcUaSNFPPeSf5Dt1ulwfS0QgAAAAAAAAAAAAAAAAAAIbGrDq2zSILwmSLpj1WMzONaieukOjsKhONfK9pcaXL1TUOr/oaF9alrsfb2MYjhPFS0+NopXFhoufxbOkRwrOWh+n1uKB0Td6sPUJQuU8OZvf5F2ONvcto301Zy3ss+/AIYSsucvM8zzZ5MZXuMS3yzc3pp5PusU3r14V0g0+KXdpJ+ty1Sqo/CVdPeEq/Mtnis8zM48Ykkz3VbxW/pO8kq0t2bcUP9Uzt/vikiK+/7OO9jSpvRCvfpY7ataKVm6iy/o+eUR61a0QrL6LK6ivrvLaidnPRyvGiFX8Ofmca35KileNtRLSwdT9EvPVDxFs/RLz1Q8Rbv38vYv05d4EQ8RYIEW+BEPEWCBFvgRDxFggRb4EQ8RYIEW+BEPEWCBFvgRDxFqg3kfAAiCCCCCKIIIIIIoj8rbD159wFQsRbIES8BULEWyBEvAVCxFsgRLwFQsRbIES8BULEWyBEvAVCxFsgdyLu+iHirR8i3voh4q0fIt76DUZkMH/MNx6VUEbtZEcl9Di8Yi9aucdxIivRyoMZ8FLF28hOtPQdkolLsiN3TIcgvce9hIcgpXOJdE0SD/GJS8naOq8uvUFh6SSv8CLdoEvrZ7XG6LYyr7VHtyVbuyHyw/RG6z48ZGdSXSmHMnCyj0mNSqehibXHScdjOGNyja/JSc/jfJ/YjZJW/rVQGu3CrfJw7zPb7vcYj9IpPAfvUN2eI2TJavHz1Y/MqknbzOVfSTDfryaGryQAAAAAAAAAAAAAAAAAAAArPgB57yJcMN9cyQAAAABJRU5ErkJggg==',
            images: images,

        }]);
        console.log(userPages)
        userDoc.update({
            pages: userPages
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
        setImages([...images, filename])
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded!'
        );
        var userDoc = await firestore().collection('users').doc(user.uid)
        userDoc.get().then((doc) => {
            if (doc.exists) {
                addPage(userDoc, images)
                
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