import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Categories from './Categories';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

export default function AdminInterface() {
  const navigation = useNavigation();
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      
<ScrollView 
      
        style={{top: 0,width:'100%',marginVertical:0, }}>
           <ImageBackground
        source={require('./assets/admin1.png')}
        style={styles.backgroundImage}>
          



          <View style={styles.button} >
          <Text style={styles.tx1}>Les catégories</Text>  
    <TouchableOpacity  title="Categories" onPress={() => navigation.navigate('Categories')} >
      
   
    <Image source={require('./assets/admin2.png')} style={styles.img2} />
          
    </TouchableOpacity>

 <Text style={styles.tx1}>Les points de collecte</Text>
    <TouchableOpacity style={styles.bt} title="Points" onPress={() => navigation.navigate('Points')}>
    
    <Image
            source={require('./assets/admin3.png')}
            style={styles.img2}
          />
          
    </TouchableOpacity>
    <Text style={styles.tx1}>Tableau de bord général </Text>
    <TouchableOpacity style={styles.bt} title="Points" onPress={() => navigation.navigate('Dashbord')}>

    <Image
            source={require('./assets/admin4.png')}
            style={styles.img2}
          />
          
    </TouchableOpacity>
    <Text >{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
    </View>




     </ImageBackground>
</ScrollView>

   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    //alignItems: 'center',
   // justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    /*width: 410,
    height: 690,*/
    width: 410,
    height: 890,
  },
 tx1:{
  fontWeight: 'bold',
  fontSize:25,
  color: '#007500',
  justifyContent: 'center',
  textAlign: 'center',
  alignSelf: 'center',
  padding:6
},
 img1:{
  width:398,
  height:165,
  justifyContent: 'center',
  alignSelf: 'center',
 },
 tx2:{
  fontWeight: 'bold',
  fontSize:25,
  color: '#007500',
  justifyContent: 'center',
 },
 img2:{
  width:300,
  height:155,
  justifyContent: 'center',
  alignSelf: 'center',
 },
 button:{
  top:160,
  justifyContent: 'center',
 },
 bt:{
top:5,
 },
});