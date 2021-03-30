import React, {useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';


const full_list = [
	{
	  title: 'Sports',
    icon: 'sports-football',
    
	},
	{
		title: 'Graduation',
    icon: 'school',
	  },
	{
		title: 'Math',
    icon: 'superscript',
    
	},
	
]



 

export default function SelectTemplate({route}) {
    
    const [page, setPage] = useState(route.params)

    const [search, setSearch] = useState('')
    const [list, setList] = useState(full_list)
    const navigation = useNavigation();
    useEffect(() => {
        setList(full_list.filter(template => template.title.toLowerCase().startsWith(search.toLowerCase())))
    }, [search]
    );

    const goToPage = (page, item) => {
      console.log(item)
      page.background = item.title + 'Template.png'
      navigation.navigate("PageViewer", page)
    }

  

    return (
      <View >
        <View style={childStyle.container}>
            <TextInput
            style={styles.TextInput}
            placeholder="Search templates..."
            autoCapitalize = "none"
            onChangeText={(search) => setSearch(search)}
            />
        </View>
        <View>
        {
            list.map((item, i) => (
            <ListItem key={i} bottomDivider
                onPress={() => goToPage(page, item)}
            >
                <Icon name={item.icon} />
                <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
            ))
        }
        </View>
      </View>
    );
  
}

const containerStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#bbdfc8',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
  
  const childStyle = StyleSheet.create({
    container: {
      margin: 30,
      // alignItems: 'flex-start',
    }
  })

  const styles = StyleSheet.create({
      container: {
          flex: 1, 
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
      },

      text_footer: {
          color: "#008891",
          fontWeight: "bold",
          fontSize: 18,
      },

      textInput: {
          flex: 1,
          marginTop: 20,
          paddingLeft: 10, 
          fontSize: 14,
      },

      remember:{
          padding: 5,
          fontWeight: "bold",
          color: "#008891",
          marginLeft: 20
      },

      login_button: {
          borderRadius: 10,
          height: 40,
          alignItems: "center",
          marginBottom: 10,
          justifyContent: "center",
          backgroundColor: "#008891",
          marginHorizontal: 70,
          marginTop: 10,
          width: 200
      },

      loginText: {
          fontWeight: "bold",
          fontSize: 18,
          color: "#fff",
      },

      forgot_button: {
          height: 30,
          marginBottom: 30,
          marginTop: 20,
          marginHorizontal: 90
      }

  })
