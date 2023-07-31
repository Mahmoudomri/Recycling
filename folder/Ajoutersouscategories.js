import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text,TextInput, View, Image,Alert, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
export default function Ajoutersouscategories() {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
    const [title, setTitle] = useState('');
    const [titledeux, setTitledeux] = useState('');
    const [imageUri, setImageUri] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/soustitles');
      setCategories(response.data);
     
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Une erreur s\'est produite lors de la récupération des catégories.');
    }
  };
  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/categories')
    .then(response => response.json())
    .then(data => setCategories(data))
    .catch(error => console.error(error));

    fetchCategories();
  }, []);
  
  
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };
  
  const saveCategorie = async () => {
    if (!title || !imageUri ) {
      Alert.alert('Error', 'Veuillez saisir un titre, un prix et sélectionner une image.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('titledeux', titledeux);
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  
    try {
      const response = await fetch('http://10.0.2.2:8000/api/soustitles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
  
      const data = await response.json();
      Alert.alert('Success', 'Catégorie enregistrée avec succès.');
      setTitle('');
      setImageUri(null);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Une erreur s\'est produite lors de l\'enregistrement de la catégorie.');
    }
  };
  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text>{item.title}</Text>
      {item.image && <Image source={{ uri: `http://10.0.2.2:8000/storage/${item.image}` }} style={{ width: 200, height: 200 }} />}
    </View>
  );
  


  return (
    <View style={styles.container}>
     <ImageBackground  source={require('./assets/backpoint4.png')}  style={styles.backgroundImage}>
     <Text >{'\n'}{'\n'}{'\n'}</Text>
     <Text style={styles.label}>        Categorie :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitle(text)}
      /></View>
      

      <Text style={styles.label}>        Sous Categorie :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={titledeux}
        onChangeText={text => setTitledeux(text)}
      /></View>
      <Text style={styles.label}>       Choisir l'icône de la Sous Catégorie :</Text>
 



      
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        
      <Image source={require('./assets/camera.png')} />
    </TouchableOpacity>

    {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, left: 150, top: -20, }} />}

      <TouchableOpacity style={styles.b} onPress={saveCategorie}>
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
  b:{
    backgroundColor: '#8ED332', 
    padding: 10,
    width: '50%',
    alignItems: 'center',
    top:60,
    right:40,
    left:100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 615,
  },
  tx0:{
    top:-80,
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
 
    top:60,
    left:150,
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

  