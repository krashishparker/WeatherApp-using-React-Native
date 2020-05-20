

import { TextInput,Card,List } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';
import { createAppContainer } from '@react-navigation/native';


import SearchScreen from './components/SearchScreen.js';
import HomeScreen from './components/HomeScreen.js';
//import { Appbar } from 'react-native-paper';
//import { Button } from 'react-native-paper';
//const TabNavigator = createBottomTabNavigator({
 // Home: HomeScreen,
  //Settings: SearchScreen,
//});

//export default createAppContainer(TabNavigator);
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Current City') {
          iconName = `md-cloud`;
        } else if (route.name === 'Select City') {
          iconName = `md-options` ;
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'white',
      inactiveTintColor: 'pink',
      activeBackgroundColor: "#6200ee",
      inactiveBackgroundColor: "#6200ee",
    }}>
           
      <Tab.Screen name="Select City" component={SearchScreen} />
      <Tab.Screen name="Current City" component={HomeScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
