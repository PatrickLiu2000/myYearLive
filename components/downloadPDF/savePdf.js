import { captureScreen } from "react-native-view-shot";

import RNImageToPdf from 'react-native-image-to-pdf';

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';


export default class savePdf extends Component{

  screenCapture = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8
    }).then(
      uri => {
        console.log("Image saved to", uri)
        this.myAsyncPDFFunction(uri)
      },
      error => console.error("Oops, snapshot failed", error),
     
    );
  }

   myAsyncPDFFunction = async (uri) => {
     console.log('myUri', uri)
    try {
      const options = {
        imagePaths:  [uri],
        name: 'MyYearBook',
        maxSize: { // optional maximum image dimension - larger images will be resized
          width: 500,
          // height: Math.round(deviceHeight() / deviceWidth() * 900),
          height: 900,
        },
        quality: .7, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      
      console.log(options.imagePaths);
      console.log(pdf.filePath);

      alert("Your file will be save at: \n \n" + pdf.filePath);
      
    } catch(e) {
      console.log(e);
    }
  }

  render() { return (
  <View> 
    <TouchableOpacity onPress={this.screenCapture}>
   
    <Text style={styles.label}>CREATE PDF</Text>
    </TouchableOpacity>
  </View>
  ) 
  }
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
  },
});