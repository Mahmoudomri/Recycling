import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text,TextInput, View, Image, ImageBackground, TouchableOpacity,Alert } from 'react-native';
import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { Platform } from 'react-native';
export default function Ajouterpoint() {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState('');
  const handleSubmit = () => {
    fetch('http://10.0.2.2:8000/api/pcollectes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description,
        place,
        image,
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    Alert.alert('Success', 'Objet enregistré avec succès.');
  }
  return (
    <View style={styles.container}>
     <ImageBackground  source={require('./assets/backpoint1.png')}  style={styles.backgroundImage}>

     <Text style={styles.tx0}>                               Ajouter {'\n'}                             des points {'\n'}                             du collecte</Text>
     <Text style={styles.label}>     Titre :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      /></View>
      <Text style={styles.label}>     Description :</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
      /></View>
      <Text style={styles.label}>     URL du point de collecte :</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={place}
        onChangeText={text => setPlace(text)}
      /></View>
      <Text style={styles.label}>     Image du point de collecte :</Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={image}
        onChangeText={text => setImage(text)}
      /></View>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Ajouter</Text>
    </TouchableOpacity>
     </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 615,
  },
  tx0:{
    top:0,
    fontSize: 30,
    fontWeight: 'bold',
    right:20,
  },
  label:{
    top:40,
    left:30,
    fontSize: 15,
    fontWeight: 'bold',
    color:'#000',
  },
  button: {
    backgroundColor: '#8ED332',
    padding: 10,
    width: '50%',
    alignItems: 'center',
    top:20,
    right:40,
    left:100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:40,
    height:45,
    maxHeight:70,
    borderWidth: 1,
    borderColor: '#8ED332',
    borderRadius: 5,
    paddingHorizontal: 5,
    top:35,
    borderRadius: 18,
    backgroundColor: '#8ED332',
    opacity: 0.8,
    ...Platform.select({
      ios: {
        shadowColor: '#8ED332',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),},
    input: {
      borderWidth: 1,
      borderColor: '#8ED332',
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
});

  