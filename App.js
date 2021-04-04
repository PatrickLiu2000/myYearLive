import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginView from './components/login/LoginView';
import RegisterScreen from './components/register/RegisterScreen';
import SelectTemplate from './components/selectTemplate/SelectTemplate';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './components/homeScreen/homeView';
import PageViewer from './components/pageViewer/PageViewer'



import Emoji from './components/addEmoji/Emoji';

import Stickers from './components/addStickers/Stickers'

import downloadPdf from './components/downloadPDF/downloadPdf'

import savePdf from './components/downloadPDF/savePdf'

const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>


            {/* <Stack.Screen
            name='LoginView'
            component={LoginView}
            options={{ 
              title: 'Login',
              headerStyle: {
                backgroundColor: '#009999',
              }, }}
          />
          <Stack.Screen
            name='homeView'
            component={HomeView}
            options={{ 
              title: 'Home',
              headerStyle: {
                backgroundColor: '#009999',
              }, }}
          />
         <Stack.Screen
          name='RegisterScreen'
            component={RegisterScreen}
            options={{ 
              title: 'Register',
              headerStyle: {
                backgroundColor: '#009999',
              }, 
            }}
        />
        <Stack.Screen
          name='SelectTemplate'
            component={SelectTemplate}
            options={{ 
              title: 'Select Template',
              headerStyle: {
                backgroundColor: '#009999',
              }, 
            }}
        /> 

        
        
        
        

{ <Stack.Screen
        name='Emoji'
        component={Emoji}
        options={{ 
          title: 'Adding Emoji',
          headerStyle: {
            backgroundColor: '#009999',
          }, 
        }} /> }

  { <Stack.Screen
        name='Stickers'
        component={Stickers}
        options={{ 
          title: 'Stickers',
          headerStyle: {
            backgroundColor: '#009999',
          }, 
        }} /> }

        <Stack.Screen
        name='PageViewer'
        component={PageViewer}
        options={{ 
          title: 'Page Viewer',
          headerStyle: {
            backgroundColor: '#009999',
          }, 
        }}
        /> */}
{/* TESTING PDF */}

<Stack.Screen
        name='downloadPdf'
        component={savePdf}
        options={{ 
          title: 'PDF',
          headerStyle: {
            backgroundColor: '#009999',
          }, 
        }}
        />


        {/* <Stack.Screen
        name='downloadPdf'
        component={downloadPdf}
        options={{ 
          title: 'PDF',
          headerStyle: {
            backgroundColor: '#009999',
          },
        }}
        />  */}


      </Stack.Navigator>
    </NavigationContainer>
  );
}