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
import Supmodif from './Supmodif';
import Reclamation from './Reclamation';
import Maps from './Maps';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BarObjet = ({ route,navigation }) => {
    const { title } = route.params || {};
    const titre = title;
    const { email } = route.params || {};
  const gmail = email;
  useEffect(() => {
    console.log(email);
    console.log(title);
  }, []);
  return (
    

    <Tab.Navigator initialRouteName="Maps" style={styles.tabNavigator}
    tabBarOptions={{
      title: 'Bienvenue ',
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
      
    }} > 
      
      <Tab.Screen name="Plus" component={Plus} options={{  tabBarLabel: 'Ajouter', title: 'Bienvenue' , tabBarIcon: ({ color, size }) => (
           <AntDesign name="pluscircle" color={color} size={40}  /> ),headerTitle: 'Bienvenue ',headerShown: false, }} 
           listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              navigation.navigate('Plus', { title: titre, email:gmail });
            }, 
          })} />



<Tab.Screen name="Maps" component={Maps} options={{ tabBarLabel: 'Maps', title: 'Bienvenue' ,  tabBarIcon: ({ color, size }) => (<MaterialIcons name="category" color={color} size={40}  />),headerTitle: ' ',headerShown: false, }} 
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();
      navigation.navigate('Maps', { title: titre, email:gmail });
    },
  })} 
/>

<Tab.Screen name="Client" component={Client} options={{ tabBarLabel: 'Clients',  title: 'Bienvenue' , tabBarIcon: ({ color, size }) => (<Entypo name="shop" color={color} size={40}  />),headerTitle: ' ',headerShown: false,  }} 
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();
      navigation.navigate('Client', { title: titre, email:gmail });
    },
  })}
/>




<Tab.Screen name="Supmodif" component={Supmodif} options={{ tabBarLabel: 'Supmodif',  title: 'Bienvenue' , tabBarIcon: ({ color, size }) => (<FontAwesome name="edit" color={color} size={40}  />), headerTitle: ' ',headerShown: false, }} 
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();
      navigation.navigate('Supmodif', { title: titre, email:gmail });
    }
  })}
/>

    <Tab.Screen name="Reclamation" component={Reclamation} options={{ tabBarLabel: 'Reclamation', title: 'Bienvenue' ,  tabBarIcon: ({ color, size }) => (<MaterialIcons name="report-problem" color={color} size={40}  />), headerTitle: ' ',headerShown: false, }} 
  listeners={({ navigation }) => ({
    tabPress: (event) => {
      event.preventDefault();
      navigation.navigate('Reclamation', { title: titre, email:gmail });
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
export default BarObjet;
