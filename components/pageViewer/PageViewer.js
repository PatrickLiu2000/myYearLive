import React from 'react';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';



import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text,
    ActivityIndicator
    
  } from 'react-native';
import SaveFooter from '../selectTemplate/SaveFooter';
import UploadImageButton from '../selectTemplate/UploadImageButton';


// So basically, the idea is that when the page is loaded, the useEffect hook
// gets all the download urls of the page's images and if there is a download url for
// the 4 image slots it will render the image. If not it will show the upload Button.
// For some reason, if i pull up the page viewer on an already saved page, sometimes it will show
// all the images, sometimes itll show some of them and sometimes it will show none. After the page loads,
// if i reload it again by saving vscode, all the images will show up but in a random order.
// Also the UI is totally busted because i'm horrible at css.
// Also i changed it so that when you save, images have fields for url and description in firestore and also 
// the homeview page icons should show the background of that page instead of the plus button image
// I'd recommend deleting all the pages you have now so that its all fresh and then playing around with it.


export default function PageViewer({route}) {
    let page = route.params
    console.log(page)
    React.useEffect(() => {
      getDownloadUrls()

      var storageRef = storage().ref('assets/')
      storageRef.child(page.background).getDownloadURL()
      .then((url) => {
        setBackground(url)

      })
      .catch((error) => {
        console.log(error)
      });
      
    }, []);
    const [background, setBackground] = React.useState('')
    const [images, setImages] = React.useState(page.images)
    const [descs, setDescs] = React.useState(page.descriptions)
    const [downloadUrls, setDownloadUrls] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    // Send each new image uri to save footer
    const setUri1 = (uri) => {
      var newImages = images
      newImages[0] = uri
      setImages(newImages)
      // console.log(images)
    }
    const setDesc1 = (desc) => {
      var cur_descs = descs
      cur_descs[0] = desc
      setDescs(cur_descs)
    }

    const setUri2 = (uri) => {
      var newImages = images
      newImages[1] = uri
      setImages(newImages)
      // console.log(images)

    }
    const setDesc2 = (desc) => {
      var cur_descs = descs
      cur_descs[1] = desc
      setDescs(cur_descs)
    }

    const setUri3 = (uri) => {
      var newImages = images
      newImages[2] = uri
      setImages(newImages)
      // console.log(images)

    }
    const setDesc3 = (desc) => {
      var cur_descs = descs
      cur_descs[2] = desc
      setDescs(cur_descs)
    }
    

    const setUri4 = (uri) => {
      var newImages = images
      newImages[3] = uri
      setImages(newImages)
    }
    const setDesc4= (desc) => {
      var cur_descs = descs
      cur_descs[3] = desc
      setDescs(cur_descs)
    }

    const getDownloadUrls = async () => {
      const user = auth().currentUser
      var newDownloadUrls = []


      var picRef = await storage().ref(user.uid + "/")
      for (var i = 0; i < images.length; i++) {
        console.log(images[i].url)
        
        await picRef.child(images[i].url).getDownloadURL()
        .then((url) => {
          newDownloadUrls.push(url)
          
        }).then(() => {
          setDownloadUrls(newDownloadUrls)
        })
        .catch((error) => {
          console.log(error)
        });
      }

      forceUpdate()
      setLoaded(true)
      
      
    }
    
    
    

    





    return (
        <View style={styles.container}>
          
          {/* {loaded ? */}
          <ImageBackground 
            source={{uri: background}}
            style={styles.image}>
          
          
          <View style={{flexDirection:"row", flex: 1}}>
            {downloadUrls[0] == null ? <UploadImageButton setUri = {setUri1} setDescription={setDesc1} style={{flex: 1}}></UploadImageButton>:
            <View style = {{padding: 3, paddingTop: 40, alignItems: 'center'}}>
                <Image source = {{uri: downloadUrls[0]}} style = {styles.picture1}></Image>
              <Text style = {styles.description}> {descs[0]} </Text>
            </View>}

            {downloadUrls[1] == null ? <UploadImageButton setUri = {setUri2} setDescription={setDesc2} style={{flex: 1}}></UploadImageButton>: 
            <View style = {{padding: 3, paddingTop: 40, alignItems: 'center'}}>
              <Image source = {{uri: downloadUrls[1]}} style = {styles.picture2}></Image>
              <Text style = {styles.description}> {descs[1]} </Text>
            </View>}
          </View>

          <View style={{flexDirection:"row", flex: 1}}>
            {downloadUrls[2] == null ? <UploadImageButton setUri = {setUri3} setDescription={setDesc3} style={{flex: 1}}></UploadImageButton>: 
            <View style = {{padding: 3, paddingTop: 40, alignItems: 'center'}}>
              <Image source = {{uri: downloadUrls[2]}} style = {styles.picture1}></Image>
              <Text style ={styles.description}> {descs[2]} </Text>
            </View >}
            {downloadUrls[3] == null ? <UploadImageButton setUri = {setUri4} setDescription={setDesc4} style={{flex: 1}}></UploadImageButton>: 
            <View style = {{padding: 3, paddingTop: 40, alignItems: 'center'}}>
              <Image source = {{uri: downloadUrls[3]}} style = {styles.picture2}></Image>
              <Text style = {styles.description}> {descs[3]} </Text>
            </View>}
          </View>

          
          
          
          
          <SaveFooter images = {images} page={page} descriptions= {descs}style={{flex:1}}></SaveFooter>

          </ImageBackground> 
          {/* <ActivityIndicator style = {{flex: 1, justifyContent: 'center', alignContent: 'center'}}></ActivityIndicator>} */}
          

        </View>
    )
    
}

const styles = StyleSheet.create({ 
    
    
  container: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',


      
  },

  image: {
      flex: 1,
      resizeMode:'cover',
      justifyContent: 'center',
    
  },

  picture1: {
    height: 200,
    resizeMode: 'contain',
    width: 200,
  },

  picture2: {
    height: 200,
    resizeMode: 'contain',
    width: 200,
  },

  description: {
    fontSize: 20,
    fontWeight: 'bold',
    alignContent: 'space-around',
  }

  
     
  
    


});