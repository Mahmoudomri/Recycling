import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ajoutercategorie from './Ajoutercategorie';
import Modifiercategorie from './Modifiercategorie';
import Supprimercategorie from './Supprimercategorie';

export default function Categories() {
    const Stack = createStackNavigator();
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground  source={require('./assets/categorie1.png')} style={styles.backgroundImage}>

<View style={styles.button} >
  
    <TouchableOpacity style={styles.bt1} title="Modifiercategorie" onPress={() => navigation.navigate('Modifiercategorie')} >
    <Image source={require('./assets/categorie3.png')} style={styles.img1} />
    <Text style={styles.tx1}>                               Modifier {'\n'}                           une catégorie</Text>  
    </TouchableOpacity>

 
    <TouchableOpacity style={styles.bt2} title="Ajoutercategorie" onPress={() => navigation.navigate('Ajoutercategorie')} >
    <Image source={require('./assets/categorie2.png')} style={styles.img2}  />
    <Text style={styles.tx2}>                              Ajouter {'\n'}                          une catégorie</Text> 
    </TouchableOpacity>


    <TouchableOpacity style={styles.bt3} title="Supprimercategorie" onPress={() => navigation.navigate('Supprimercategorie')}>
    <Image  source={require('./assets/categorie4.png')} style={styles.img3} />
    <Text style={styles.tx3}>                             Supprimer{'\n'}                           une catégorie</Text>
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
top : 175,
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
    top:5,
   },
   img3:{
    width:295,
    height:132,
    justifyContent: 'center',
    alignSelf: 'center',
    top:5,
   },
   tx1: {
    top:-90,
    left:40,
    fontWeight: 'bold',
    fontSize:23,
    color: '#fff',
  },
  tx2: {
    top:-95,
    left:40,
    fontWeight: 'bold',
    fontSize:23,
    color: '#fff',
  },
  tx3: {
    top:-95,
    left:40,
    fontWeight: 'bold',
    fontSize:23,
    color: '#fff',
  },
  bt1:{
    
  },
  bt2:{
    top: -50,
  },
  bt3:{
    top: -100,
  },
});
//<Text >{'\n'}{'\n'}{'\n'}{'\n'}</Text>
/*
   
         */