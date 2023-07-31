import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StyleSheet,FlatList,TextInput,TouchableOpacity,Alert,ImageBackground} from 'react-native';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
const Pagedeux = ({ route }) => {
  const [name, setname] = useState('');
  const [emaill, setemaill] = useState('');
  const [prenom, setPrenom] = useState('');
  const [type, setType] = useState('');
  const [tel, setTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [daten, setDaten] = useState('');
  const [categorie, setCategorie] = useState([]);
  const { email } = route.params || {};
  const fetchCategorie = async () => {
    const { email } = route.params || {};
      try {
        const response = await axios.get(`http://10.0.2.2:8000/api/signup`);
        const { name,prenom,type, emaill, tel, adresse,daten} = response.data;
        setname(name);
        setPrenom(prenom);
        setType(type);
        setemaill(emaill);
        setTel(tel);
        setAdresse(adresse);
        setDaten(daten);
      setCategorie(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while fetching categories.');
    }
  };





  useEffect(() => {
    fetchCategorie();
    fetchData();
   
  }, []);
  const fetchData = async () => {
   
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/signup/${email}`);
      const {  name,prenom,type, tel, adresse, daten} = response.data;
      setname(name);
      setPrenom(prenom);
      setType(type);
      setTel(tel);
      setAdresse(adresse);
      setDaten(daten);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async () => {
  const updatedData = { name,prenom,type, email, tel, adresse, daten };
  try {
    const response = await fetch(`http://10.0.2.2:8000/api/api/signup/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    const data = await response.json();
    console.log(data);
    Alert.alert('Enregistrement', 'Mis à jour effectue avec succes.');
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Une erreur est survenue lors de la mise à jour des données.');
  }
};


  



  const renderItem = ({ item }) => {
    if (item.email === email) {
        return (
         
            <View >
              <Text > {item.email}</Text>
              <Text > {item.name}</Text>
              <Text > {item.prenom}</Text>
              <Text > {item.type}</Text>
              <Text > {item.tel}</Text>
              <Text > {item.adresse}</Text>
              <Text > {item.daten}</Text>
          </View>
        );
      }
    };


  return (

      <ScrollView>
     <ImageBackground  source={require('./assets/profil.png')}  style={styles.backgroundImage}>
<View  style={{ top:30,}}>
 
    <View style={styles.inputContainer}>
    <MaterialIcons name="drive-file-rename-outline" size={24} color="#fff" style={{left:20,}} />
    <TextInput
      style={styles.input}
      value={name}
      onChangeText={setname}
     placeholder="Entrez un titre"
    /></View>
 <View style={styles.inputContainer}>
    <MaterialIcons name="drive-file-rename-outline" size={24} color="#fff" style={{left:20,}} />
    <TextInput
      style={styles.input}
      value={prenom}
      onChangeText={setPrenom}
     placeholder="Entrez prenom"
    /></View>
    <View style={styles.inputContainer}>
    <MaterialIcons name="drive-file-rename-outline" size={24} color="#fff" style={{left:20,}} />
    <TextInput
      style={styles.input}
      value={type}
      onChangeText={setType}
     placeholder="Entrez votre type"
    /></View>

    <View style={styles.inputContainer}>
    <Foundation name="telephone" size={24} color="#fff" style={{left:20,}} />
    <TextInput
      style={styles.input}
      value={tel}
      onChangeText={setTel}
      placeholder="Entrez un lieu"
    /></View>

 
   
    <View style={styles.inputContainer}>
    <FontAwesome name="map-marker" size={24} color="#fff" style={{left:20,}} />
    <TextInput
      style={styles.input}
      value={adresse}
      onChangeText={setAdresse}
      placeholder="Entrez une URL d'image"
    /></View>



    <View style={styles.inputContainer}>
    <MaterialIcons name="date-range" size={24} color="#fff" style={{left:20,}} />
    <TextInput
      style={styles.input}
      value={daten}
      onChangeText={setDaten}
      placeholder="Entrez une URL d'image"
    /></View>
    {/*
      Bouton de soumission
    */}
    <TouchableOpacity style={[styles.button,]} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Modifier</Text>
    </TouchableOpacity>
    </View>
    </ImageBackground>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
 
  top:-70,
  },
  form: {
  flex: 1,
  
  },
  backgroundImage: {
      resizeMode: 'cover',
      justifyContent: 'center',
      width: 415,
      height: 650,
    },
    tx0:{
      top:50,
      fontSize: 30,
      fontWeight: 'bold',
      right:20,
    },
  label: {
  fontSize: 15,
  left:30,
  top:40,
  fontWeight: 'bold',
  color:'#000',
  },
  
  button: {
      backgroundColor: '#98D632',
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
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  },
  
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
      marginHorizontal:45,
     right:0,
      borderWidth: 1,
      borderColor: '#98D632',
      borderRadius: 5,
      paddingHorizontal: 5,
      top:30,
      borderRadius: 18,
      backgroundColor: '#98D632',
      opacity: 0.9,
      ...Platform.select({
        ios: {
          shadowColor: '#98D632',
          shadowOffset: { width: 10, height: 20 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        },
        android: {
          elevation: 4,
        },
      }),},
      input: {
        borderWidth: 0,
        borderColor: '#98D632',
        borderRadius: 4,
        padding: 3.5,
        marginBottom: 10,
        left:40,
        height:'100%',
        width: '100%',
      },
  });
export default Pagedeux;
