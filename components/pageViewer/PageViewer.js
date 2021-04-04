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
    const [descs, setDescs] = React.useState([4])
    const [imageUri1, setImageUri1] = React.useState('')
    const [imageUri2, setImageUri2] = React.useState('')
    const [imageUri3, setImageUri3] = React.useState('')
    const [imageUri4, setImageUri4] = React.useState('')

    // Send each new image uri to save footer
    const setUri1 = (uri) => {
      var newImages = images
      newImages[0] = uri
      setImages(newImages)
      console.log(images)
    }
    const setDesc1 = (desc) => {
      var cur_descs = descs
      cur_descs[0] = desc
      setDescs(cur_descs)
      console.log('sssssssssssssssssssssssss')
      console.log(cur_descs)
    }

    const setUri2 = (uri) => {
      var newImages = images
      newImages[1] = uri
      setImages(newImages)
      console.log(images)

    }
    const setDesc2 = (desc) => {
      var cur_descs = descs
      cur_descs[1] = desc
      setDescs(cur_descs)
      console.log(cur_descs)
    }

    const setUri3 = (uri) => {
      var newImages = images
      newImages[2] = uri
      setImages(newImages)
      console.log(images)

    }
    const setDesc3 = (desc) => {
      var cur_descs = descs
      cur_descs[1] = desc
      setDescs(cur_descs)
      console.log(cur_descs)
    }
    

    const setUri4 = (uri) => {
      var newImages = images
      newImages[3] = uri
      setImages(newImages)
      console.log(images)

    }
    const setDesc4= (desc) => {
      var cur_descs = descs
      cur_descs[1] = desc
      setDescs(cur_descs)
      console.log(cur_descs)
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
            <UploadImageButton setUri = {setUri1} setDescription={setDesc1} style={{flex: 1}}></UploadImageButton>
            <UploadImageButton setUri = {setUri2} setDescription={setDesc2} style={{flex: 2}}></UploadImageButton>
          </View>

          <View style={{flexDirection:"row", flex: 2}}>
            <UploadImageButton setUri = {setUri3} setDescription={setDesc3} style={{flex: 1}}></UploadImageButton>
            <UploadImageButton setUri = {setUri4} setDescription={setDesc4} style={{flex: 2}}></UploadImageButton>
          </View>
          
          
          
          <SaveFooter images = {images} page={page} descriptions= {descs}style={{flex:1}}></SaveFooter>

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