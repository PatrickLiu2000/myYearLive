import React, {useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert
  } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


const styles = StyleSheet.create({
  template: {
    width: 75,
    height: 100,
    marginTop: 30,
    marginRight: 30,
    marginLeft: 30
  },
  view: {
    // flexDirection: 'row',
    flexWrap: 'wrap'
  },

  label: {
    position: 'relative',
    fontSize: 15,
    textAlign: 'center',
    color: '#008891'
  },
  new_page_button: {
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "#008891",
    marginHorizontal: 108,
    marginTop: 10,
    width: 200
},
  new_page_button_text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
  },
  delete_button_text: {
    position: 'relative',
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
  delete_button: {
    backgroundColor: '#b20000',
    borderRadius: 10,
    marginTop: 10,
    width: 100,
    marginHorizontal: 20,
    alignItems: "center",
  }
});

export default function HomeView() {
  const numColumns = 3;
  const navigation = useNavigation();
  const [userPages, setuserPages] = React.useState([])
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .onSnapshot(documentSnapshot => {
          // console.log()
          setuserPages(documentSnapshot.data().pages)
        });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  
  const [madeEdits, setMadeEdits] = React.useState(false)
  const addPage = () => {
      setuserPages([...userPages, 
      {
        id: userPages.length,
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAY1BMVEX///8AAAAGBgatra3h4eHc3NwNDQ18fHz6+vqUlJT19fW5ubkUFBRZWVkmJiYRERGnp6dSUlJMTExFRUVqampeXl4wMDC6urqxsbFUVFQsLCzZ2dlBQUGioqJ2dnaRkZF/f39xRK95AAACgElEQVR4nO2dW1PCQAxG2V4AKS1QpHJR5P//SmEYx13EcUaSNFPPeSf5Dt1ulwfS0QgAAAAAAAAAAAAAAAAAAIbGrDq2zSILwmSLpj1WMzONaieukOjsKhONfK9pcaXL1TUOr/oaF9alrsfb2MYjhPFS0+NopXFhoufxbOkRwrOWh+n1uKB0Td6sPUJQuU8OZvf5F2ONvcto301Zy3ss+/AIYSsucvM8zzZ5MZXuMS3yzc3pp5PusU3r14V0g0+KXdpJ+ty1Sqo/CVdPeEq/Mtnis8zM48Ykkz3VbxW/pO8kq0t2bcUP9Uzt/vikiK+/7OO9jSpvRCvfpY7ataKVm6iy/o+eUR61a0QrL6LK6ivrvLaidnPRyvGiFX8Ofmca35KileNtRLSwdT9EvPVDxFs/RLz1Q8Rbv38vYv05d4EQ8RYIEW+BEPEWCBFvgRDxFggRb4EQ8RYIEW+BEPEWCBFvgRDxFqg3kfAAiCCCCCKIIIIIIoj8rbD159wFQsRbIES8BULEWyBEvAVCxFsgRLwFQsRbIES8BULEWyBEvAVCxFsgdyLu+iHirR8i3voh4q0fIt76DUZkMH/MNx6VUEbtZEcl9Di8Yi9aucdxIivRyoMZ8FLF28hOtPQdkolLsiN3TIcgvce9hIcgpXOJdE0SD/GJS8naOq8uvUFh6SSv8CLdoEvrZ7XG6LYyr7VHtyVbuyHyw/RG6z48ZGdSXSmHMnCyj0mNSqehibXHScdjOGNyja/JSc/jfJ/YjZJW/rVQGu3CrfJw7zPb7vcYj9IpPAfvUN2eI2TJavHz1Y/MqknbzOVfSTDfryaGryQAAAAAAAAAAAAAAAAAAAArPgB57yJcMN9cyQAAAABJRU5ErkJggg==',
        // add other page props here
        images: [],
        background: ''
      }]);
      setMadeEdits(true)
  }


  const deletePage = index => {
    const newTimes = [...userPages];
    newTimes.splice(index, 1);
    for (var i = 0; i < newTimes.length; i++) {
      newTimes[i].id = i + 1;
    }
    setuserPages(newTimes);
    setMadeEdits(true)
  }
  const savePages = () => {
    let curUser = auth().currentUser
    firestore().collection('users').doc(curUser.uid).update({
      pages: userPages
    })
    Alert.alert(
      'Saved Yearbook Pages to Database!'
    )
  }

  const goToPage = (item) => {
    if (item.background == "") {
      navigation.navigate("SelectTemplate", item)
    } else {
      navigation.navigate("PageViewer", item)
    }
  }
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={() =>
            addPage()
          } style={styles.new_page_button}>
          <Text style={styles.new_page_button_text}>Add New Page</Text>        
        </TouchableOpacity>
        {madeEdits ? <TouchableOpacity onPress={() =>
            savePages()
          } style={styles.new_page_button}>
          <Text style={styles.new_page_button_text}>Save Changes</Text>        
        </TouchableOpacity> : null}
        <FlatList
          data={userPages}
          numColumns = {numColumns}
          renderItem={({item, index}) => 
          <View>
            <TouchableOpacity onPress={() => goToPage(item)}>
                <Image 
                  source={{uri: item.url}}
                  style={styles.template}
                />
                <Text style={styles.label}> Page {item.id + 1} </Text>
              </TouchableOpacity>
            <TouchableOpacity onPress= {() => deletePage(index)} style={styles.delete_button}>
              <Text style = {styles.delete_button_text}>Delete</Text>
            </TouchableOpacity>
          </View>
          }
        />
      </View>
    )
}