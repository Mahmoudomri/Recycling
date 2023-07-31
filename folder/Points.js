import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ajouterpoint from './Ajouterpoint';
import Modifierpoint from './Modifierpoint';
import Supprimerpoint from './Supprimerpoint';
export default function Points() {
    const Stack = createStackNavigator();
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground  source={require('./assets/point1.png')} style={styles.backgroundImage}>

<View style={styles.button} >
  
    <TouchableOpacity style={styles.bt1} title="Modifierpoint" onPress={() => navigation.navigate('Modifierpoint')} >
    <Image source={require('./assets/categorie3.png')} style={styles.img1} />
    <Text style={styles.tx1}>                              Modifier {'\n'}                            des points {'\n'}                            du collecte</Text>  
    </TouchableOpacity>

 
    <TouchableOpacity style={styles.bt2} title="Ajouterpoint" onPress={() => navigation.navigate('Ajouterpoint')} >
    <Image source={require('./assets/categorie2.png')} style={styles.img2}  />
    <Text style={styles.tx2}>                               Ajouter {'\n'}                             des points {'\n'}                             du collecte</Text> 
    </TouchableOpacity>


    <TouchableOpacity style={styles.bt3} title="Supprimercategorie" onPress={() => navigation.navigate('Supprimerpoint')}>
    <Image  source={require('./assets/categorie4.png')} style={styles.img3} />
    <Text style={styles.tx3}>                            Supprimer{'\n'}                            des points {'\n'}                            du collecte</Text>
    </TouchableOpacity>
</View>
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 410,
    height: 690,
    top: -15,
  },
  button:{
top : 215,
  },
  img1:{
    width:295,
    height:132,
    justifyContent: 'center',
    alignSelf: 'center',
    top : 5,
   },
   img2:{
    width:295,
    height:132,
    justifyContent: 'center',
    alignSelf: 'center',
    top:0,
   },
   img3:{
    width:295,
    height:132,
    justifyContent: 'center',
    alignSelf: 'center',
    top:0,
   },
   tx1: {
    top:-110,
    left:40,
    fontWeight: 'bold',
    fontSize:23,
    color: '#fff',
  },
  tx2: {
    top:-110,
    left:35,
    fontWeight: 'bold',
    fontSize:23,
    color: '#fff',
  },
  tx3: {
    top:-110,
    left:40,
    fontWeight: 'bold',
    fontSize:23,
    color: '#fff',
  },
  bt1:{
    
  },
  bt2:{
    top: -75,
  },
  bt3:{
    top: -150,
  },
});
//<Text >{'\n'}{'\n'}{'\n'}{'\n'}</Text>
/*
   
         */