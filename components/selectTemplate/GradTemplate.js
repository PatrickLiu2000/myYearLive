import React from 'react';

import {
    View,
    Text,
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
import UploadImageButton from './UploadImageButton'


  export default function GraduationTemplate() {
      return (
    <View style={styles.container}>
        <ImageBackground source={require('./GradTemplate.png')} style={styles.image}>
            <UploadImageButton></UploadImageButton>

        </ImageBackground>

    </View>

      )
  }

  const styles = StyleSheet.create({ 
      container: {
          flex: 1,
          flexDirection:'column'
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
      }

  });



  


