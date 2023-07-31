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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = ({ route,navigation }) => {
  const { email } = route.params || {};
  const gmail = email;
  useEffect(() => {
    console.log(email);
  }, []);

  return (
    

    <Tab.Navigator initialRouteName="Pagetrois" style={styles.tabNavigator}
    tabBarOptions={{
      
      showLabel: false,
      style: {
        opacity: 0.1,
      },
      tabStyle: {
        borderRadius: 0,
        marginHorizontal: 0,
        backgroundColor: '##E3F4CB',
        
      },
      inactiveTintColor: '#D3CCB0',
      activeTintColor: '#68C239',
      
    }}> 
      

      <Tab.Screen name="Pageun" component={Pageun} options={{  tabBarLabel: 'Profil',  tabBarIcon: ({ color, size }) => (
           <FontAwesome5 name="map-marked-alt"   color={color} size={35}  /> ),headerTitle: ' ',headerShown: false, }} />

<Tab.Screen
  name="Pagedeux"
  component={Pagedeux}
  initialParams={{ email: gmail }} // pass the email parameter as initialParams
  options={{
    tabBarLabel: 'Points de collecte',
    tabBarIcon: ({ color, size }) => (
      <Octicons name="feed-person" color={color} size={35} />
    ),headerTitle: ' ',headerShown: false,
  }}
/>


            
      <Tab.Screen name="Pagetrois" component={Pagetrois} initialParams={{ email: gmail }} options={{ tabBarLabel: 'Catégories', tabBarIcon: ({ color, size }) => (
            <FontAwesome name="recycle"  color={color}  size={35}  /> ), title: 'ef',headerShown: false,}} />


      <Tab.Screen name="Pagequatre" component={Pagequatre} initialParams={{ email: gmail }} options={{ tabBarLabel: 'Catégories', tabBarIcon: ({ color, size }) => (
            <Fontisto name="shopping-basket" color={color} size={35}  /> ), headerTitle: ' ',headerShown: false,}} />


      <Tab.Screen name="Pagecinq" component={Pagecinq} initialParams={{ email: gmail }} options={{ tabBarLabel: 'Catégories', tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" color={color} size={35}  /> ), headerTitle: ' ',headerShown: false,}} />


      </Tab.Navigator>
  
  );
};
const styles = StyleSheet.create({
  button: {
  right:10,
  left: 10,
  },
});
export default MainTabScreen;
