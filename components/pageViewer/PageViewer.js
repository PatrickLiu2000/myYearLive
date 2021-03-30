import React from 'react';
import storage from '@react-native-firebase/storage';


import {
    StyleSheet,
    View,
    ImageBackground,
    
  } from 'react-native';
import SaveFooter from '../selectTemplate/SaveFooter';
import UploadImageButton from '../selectTemplate/UploadImageButton';



export default function PageViewer({route}) {
    let page = route.params
    console.log(page)
    const [background, setBackground] = React.useState('')
    const [images, setImages] = React.useState(page.images)
    const [imageUri, setImageUri] = React.useState('')


    // Send each new image uri to save footer
    const setUri = (uri) => {
      setImageUri(uri)
    }

    const updateImages = (imageList) => {
      setImages(imageList)
      
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
          
          
          <View style={{flexDirection:"row", flex: 1}}>
            <UploadImageButton setUri = {setUri} style={{flex: 1}}></UploadImageButton>
            <UploadImageButton setUri = {setUri} style={{flex: 2}}></UploadImageButton>
          </View>

          <View style={{flexDirection:"row", flex: 2}}>
            <UploadImageButton setUri = {setUri} style={{flex: 1}}></UploadImageButton>
            <UploadImageButton setUri = {setUri} style={{flex: 2}}></UploadImageButton>
          </View>
          
          
          
          <SaveFooter uri = {imageUri} updateImages={updateImages} page={page} style={{flex:1}}></SaveFooter>

          </ImageBackground>
          

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

  

  
     
  
    


});