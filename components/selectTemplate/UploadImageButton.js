import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import SaveFooter from './SaveFooter'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';





export default function UploadImageButton() {
  const [response, setResponse] = React.useState(null)

  if (response == null || response.uri == null) {
    return (
    <View style={styles.container}>
        <ScrollView>
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
                  setResponse(response);
                },
              )
            }
            }>
              <Text style={styles.button}>+</Text>
          </TouchableOpacity>
          </ScrollView>
          <SaveFooter uri = {null}/>
    </View>
    )
  }
  return(
    <View style={styles.container}>
      <ScrollView >     
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
      
      
      </ScrollView>  

      <SaveFooter uri = {response.uri}/>
  </View>
  )
  

  
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center'
    },

    image: {
        flex: 1,
        resizeMode:'cover',
        justifyContent: 'center',
        alignItems:'center'
        
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
    },
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



  


