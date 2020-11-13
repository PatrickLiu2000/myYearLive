import * as React from 'react';
import {SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
const DATA = [
  {
    id: 1,
    title: 'New Page',
  },
  {
    id: 2,
    title: 'Soccer',
  },
  {
    id: 3,
    title: 'Quiz Bowl',
  },
  {
    id: 4,
    title: 'Friends',
  }
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const renderItem = ({ item }) => (
  <View>
    <Item/>
    <Text style={styles.title}>{item.title}</Text>
  </View>
);

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Pages</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}
// used to update search box
function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: '#ECF4F3'}}>
      <Text style={styles.header}>Search</Text>
    </View>
  );
}
function FriendsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: '#ECF4F3'}}>
      <Text style={styles.header}>Friends</Text>
    </View>
  );
}
function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , backgroundColor: '#ECF4F3'}}>
      <Text style={styles.header}>Profile</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    tabBarOptions={{
      activeTintColor: '#000000',
    }}
    >
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name={'home'} />
        ),
      }}/>
      <Tab.Screen name="Search" component={SearchScreen} 
      options={{
        tabBarLabel: 'Search',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name={'search'} />
        ),
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name={'user'} />
        ),
      }}/>
      <Tab.Screen name="Friends" component={FriendsScreen} 
      options={{
        tabBarLabel: 'Friends',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name={'user-friends'} />
        ),
      }}/>
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    fontFamily: "Trebuchet MS",
    fontSize: 40
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ECF4F3'
  },
  item: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#2b4bff',
    borderWidth: 1,
    height: 130,
    width: 100,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    color: '#57b4f7',
    textAlign: 'center'
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}