import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, StyleSheet, Text,TextInput, View, Image,Alert, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Platform } from 'react-native';
import { TouchableOpacityBase } from 'react-native';
export default function Plus({ route }) {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
   const [titlee, setTitlee] = useState("");
    const [type, setType] = useState("");
    const [adresse, setAdresse] = useState("");
    const [emaill, setEmaill] = useState("");
    const [prix, setPrix] = useState("");
    const [quantite, setQuantite] = useState("");
    const [qualite, setQualite] = useState("");
    const [imageUri, setImageUri] = useState("");
    const [description, setDescription] = useState("");
    const { title } = route.params || {};
    const { email } = route.params || {};
  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const id = route.params.id;
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/objets/${id}`);
      const data = await response.json();
      const { title,type,adresse,email, prix, quantite, qualite, imageUri,description } = data;
      setTitlee(title);
      setType(type);
      setAdresse(adresse);
      setEmaill(email);
      setPrix(prix);
      setQuantite(quantite);
      setQualite(qualite);
      setImageUri(imageUri);
      setDescription(description);
    } catch (error) {
      console.log(error);
    }
  };
  

  
  
  
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
    formData.append('type', type);
    formData.append('adresse', adresse);
    formData.append('email', email);
    formData.append('prix', prix);
    formData.append('quantite', quantite);
    formData.append('qualite', qualite);
    formData.append('description', description);
    formData.append('image', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
  
    try {
      const response = await fetch('http://10.0.2.2:8000/api/objets', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });
  
      const data = await response.json();
      Alert.alert('Success', 'Objet enregistré avec succès.');
      setTitlee('');
      setType('');
      setAdresse('');
      setEmaill('');
      setPrix('');
      setQuantite('');
      setQualite('');
      setDescription('');
      setImageUri(null);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Une erreur s\'est produite lors de l\'enregistrement de la catégorie.');
    }
  };
 
  

  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor:'#fff', marginVertical:5,top:45,}}>
    <View style={{ top:-200}}>

      <Text style={styles.label}>        Type :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={title}
        onChangeText={text => setTitlee(text)}
      /></View>
<Text style={styles.label}>        email :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmaill(text)}
      /></View>
</View>

<View style={{ top:-190}}>

<Text style={styles.label}>        Titre :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={type}
        onChangeText={text => setType(text)}
      /></View>

<Text style={styles.label}>        Adresse :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={adresse}
        onChangeText={text => setAdresse(text)}
      /></View>





     <Text style={styles.label}>        Prix :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={prix}
        onChangeText={text => setPrix(text)}
      /></View>

      
     <Text style={styles.label}>        Quantite :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={quantite}
        onChangeText={text => setQuantite(text)}
      /></View>


      
     <Text style={styles.label}>        Qualite :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={qualite}
        onChangeText={text => setQualite(text)}
      /></View>
<Text style={styles.label}>        Description :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        value={description}
        onChangeText={text => setDescription(text)}
      /></View>


      <Text style={styles.label}>        Choisir l'icon de la catégorie :</Text>
 



      
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        
      <Image source={require('./assets/camera.png')} />
    </TouchableOpacity>

    {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, left: 150, top: -32, }} />}

      <TouchableOpacity style={styles.b} onPress={saveCategorie}>
      <Text style={styles.buttonText}>Ajouter</Text>
    </TouchableOpacity>

    </View>
    </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:-40,
    backgroundColor:'#fff',
    height:700,
  },
  b:{
    backgroundColor: '#8ED332', 
    padding: 10,
    width: '50%',
    alignItems: 'center',
    top:30,
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
    marginBottom:-5,
  },
  button: {
 
    top:40,
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
      padding: 2,
      marginBottom: 10,
      width: '100%',
    },
});

  