import React from 'react';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


import {
    StyleSheet,
    View,
    ImageBackground,
    FlatList,
    Image,
    Text
  } from 'react-native';
import SaveFooter from '../selectTemplate/SaveFooter';
import UploadImageButton from '../selectTemplate/UploadImageButton';



export default function PageViewer({route}) {
    let page = route.params
    console.log(page)
    const [background, setBackground] = React.useState('')
    const [images, setImages] = React.useState(page.images)
    const [imageUri, setImageUri] = React.useState('')

    const setUri = (uri) => {
      setImageUri(uri)
    }

    const updateImages = (imageList) => {
      setImages(imageList)
      console.log("imagel")
      console.log(imageList)
    }
    

    React.useEffect(() => {
      var storageRef = storage().ref('assets/')
      storageRef.child(page.background).getDownloadURL()
      .then((url) => {
        setBackground(url)

      })
      .catch((error) => {
        console.log(error)
      });
    }, []);




    return (
        <View style={styles.container}>
          
          
          <ImageBackground 
            source={{uri: background}}
            style={styles.image}>
          
          

          <UploadImageButton setUri = {setUri}></UploadImageButton>
          

          </ImageBackground>
          
          <SaveFooter uri = {imageUri} updateImages={updateImages} page={page}></SaveFooter>

        </View>
    )
    
}

const styles = StyleSheet.create({ 
    
    
  container: {
      flex: 1,
      flexDirection:'column',
  },

  image: {
      flex: 1,
      resizeMode:'cover',
      justifyContent: 'center',
    
  },

  picture: {
    width: 150,
    height: 150,
    borderColor: "black"
  }
     
  
    


});