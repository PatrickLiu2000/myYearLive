import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage'


import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from 'react-native';





export default function UploadImageButton() {
  const [response, setResponse] = React.useState(null)

  if (response == null || response.uri == null) {
    return (
    <View style={styles.container}>
        
            <TouchableOpacity
            onPress={() => {
              ImagePicker.launchImageLibrary(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                (response) => {
                  console.log(response)
                  setResponse(response);
                },
              )
            }
            }>
              <Text style={styles.button}>+</Text>
          </TouchableOpacity>

    </View>
    )
  }
  return(
    <View style={styles.container}>        
      {response && (
      <View style={styles.image}>
        <Image
          style={{width: 200, height: 200, borderColor:'black', borderWidth:5}}
          source={{uri: response.uri}}
        />
      </View>
      )}
      <TouchableOpacity
        onPress={() => {
          ImagePicker.launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 200,
              maxWidth: 200,
            },
            (response) => {
              console.log(response)
              setResponse(response);
            },
          )
        }
      }>
        <Text style={styles.changeImage}>Change Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async() => {
          console.log(response.uri)
          const uri = response.uri
          const user = auth().currentUser
          console.log(user)
          const filename = user.uid
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
        <Text style={styles.changeImage}>Upload to firebase</Text>
      </TouchableOpacity>
  
  </View>
  )
  

  
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center'
    },

    image: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        
    },

    button: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 100,
        color:'#5b5b5b'
    },
    changeImage: {
      fontWeight: 'bold',
      textAlign: 'center',
      color:'#5b5b5b',
    },
    image: {
      marginVertical: 24,
      alignItems: 'center',
      borderRadius: 400/2
    }

});



  


