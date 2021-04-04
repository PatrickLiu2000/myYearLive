import React from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput
  } from 'react-native';





export default function UploadImageButton({setUri, setDescription}) {
  const [response, setResponse] = React.useState(null)
  const [description, onChangeDescription] = React.useState("");
  React.useEffect(() => {
    if (response != null) {
      setUri(response.uri)
    }
  }, [response]
  );
  // React.useEffect(() => {
  //   console.log("kkskdffkasdfaksdfaskdfadskadksd")
  //   if (description != '') {
  //     setDescription(description)
  //   }
  // }, [description]
  // );

  const changeDesc = (text) => {
    onChangeDescription(text)
    setDescription(text)
    console.log(text)
  }

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
                  setResponse(response);
                  
                },
              )
              if (response) {
                console.log('here')
                setUri(response.uri)
              }
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
          style={{width: 150, height: 150, borderColor:'black', borderWidth:5}}
          source={{uri: response.uri}}
        />
      </View>
      )}
      <TextInput
      onChangeText={text => changeDesc(text)}
      placeholder={"Image Description"}
      value={description}
      placeholderTextColor="#202429" 
      style={{textAlign:"center", fontSize: 20}}
      />
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
        <Text style={styles.changeImage}>Change Image</Text>
      </TouchableOpacity>
      
      

  </View>
  )
  

  
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent:'center',
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



  


