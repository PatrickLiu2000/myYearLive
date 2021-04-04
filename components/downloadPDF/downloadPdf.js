import React, { Component } from 'react';

import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class downloadPdf extends Component {
  async createPDF() {
    let options = {
      html: '<h1><img src="https://wallpaperaccess.com/full/5224.jpg" width="500"/></h1>',
      
    fileName: 'myYearBook',
    directory: 'Documents',
    

    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);
    alert("Your file will be save at: \n \n" + file.filePath);
  }

  render() {
    return(
      <View>
        <TouchableOpacity onPress={this.createPDF}>
          <Text style={styles.label}>Create PDF</Text>
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