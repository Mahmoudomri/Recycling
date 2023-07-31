import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, } from 'react-native';
import Pagedeux from './Pagedeux';
import Pagetrois from './Pagetrois';
import Pageun from './Pageun';
import { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Pagequatre from './Pagequatre';
import Pagecinq from './Pagecinq';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';  
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Plus from './Ajouter';
import Objet from './Objet';
import Client from './Client';
import Pun from './Pun';
import Pdeux from './Pdeux';
import Ptrois from './Ptrois';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Dashbord = ({ route,navigation }) => {
    const { title } = route.params || {};
    const titre = title;
    const { email } = route.params || {};
  const gmail = email;
  useEffect(() => {
    console.log(email);
    console.log(title);
  }, []);
  return (
    

    <Tab.Navigator initialRouteName="Objet" style={styles.tabNavigator}
    tabBarOptions={{
      
      showLabel: false,
      style: {
        opacity: 0.1,
        top: 50,
      },
      tabStyle: {
        borderRadius: 0,
        marginVertical:0,
        marginHorizontal: 0,
        backgroundColor: '##E3F4CB',
        
      },
      inactiveTintColor: '#D3CCB0',
      activeTintColor: '#68C239',
      
    }}> 
      

<Tab.Screen name="Objet" component={Pdeux} options={{ tabBarLabel: 'Pdeux', tabBarIcon: ({ color, size }) => (<FontAwesome name="users"color={color} size={40}  />), }} 
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();
      navigation.navigate('Objet', { title: titre, email:gmail });
    },
  })}
/>

<Tab.Screen name="Client" component={Ptrois} options={{ tabBarLabel: 'Ptrois', tabBarIcon: ({ color, size }) => (<FontAwesome5 name="chart-line" color={color} size={40}  />), }} 
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();
      navigation.navigate('Client', { title: titre, email:gmail });
    },
  })}
/>

          
      </Tab.Navigator>
  
  );
};
const styles = StyleSheet.create({
  button: {
  right:10,
  left: 10,
  },
});
export default Dashbord;
