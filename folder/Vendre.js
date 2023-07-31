import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { CheckBox } from 'expo';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
export default function Vendre({ route, navigation }) {
  const { id } = route.params || {};
  //const { email } = route.params || {};
  const { Emaildeux } = route.params || {};
  const { emaill } = route.params || {};
  const { quantite } = route.params || {};
  const { qualite } = route.params || {};
  const [nom, setNom] = useState('');
  const [modepaiement, setModePaiement] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresseun, setAdresseUn] = useState('');
  const [adressedeux, setAdresseDeux] = useState('');
  const [pays, setPays] = useState('');
  const [ville, setVille] = useState('');
  const [codepostal, setCodePostal] = useState('');
  const [telephone, setTelephone] = useState('');
  const [informations, setInformations] = useState('');
  const [idobjet, setIdObjet] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [namedeux, setNamedeux] = useState('');
  const [adresse, setAdresse] = useState('');
  const [tel, setTel] = useState('');
 // const [modePaiement, setModePaiement] = useState('');
  useEffect(() => {
    fetchData();
    console.log(emaill);
    console.log(qualite);
    console.log(quantite);
  }, []);
  
  useEffect(() => {
    axios.get(`http://10.0.2.2:8000/api/signup/${emaill}`)
    .then(response => {
      setUser(response.data);
      if (response.data) {
        setName(response.data.name);
        setNamedeux(response.data.namedeux);
        setAdresse(response.data.adresse);
        setTel(response.data.tel);
      }
    })
    .catch(error => {
      console.log(error);
    });
}, [email]);



  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/vendres');
      const {
        nom,
        prenom,
        adresseun,
        adressedeux,
        pays,
        ville,
        codepostal,
        telephone,
        informations,
        modepaiement,
      } = response.data;
      setNom(nom);
      setPrenom(prenom);
      setAdresseUn(adresseun);
      setAdresseDeux(adressedeux);
      setPays(pays);
      setVille(ville);
      setCodePostal(codepostal);
      setTelephone(telephone);
      setInformations(informations);
      setModePaiement(modepaiement);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while fetching categories.');
    }
  };

  
 
    const setPaiementSurPlace = () => {
      setModePaiement('sur place');
    };
  
    const setPaiementEnLigne = () => {
      setModePaiement('en ligne');
      navigation.navigate('StripeApp');
    };
    
     
    
  
    const saveCategorie = async () => {
    
    
      const data = {
        idobjet: id,
        email: Emaildeux,
        nom: name,
        prenom: name,
        adresseun : adresse,
        adressedeux,
        pays,
        ville,
        codepostal,
        telephone: tel,
        informations,
        modepaiement,
      };
    
      try {
        // Vérifier les doublons
        const responsee = await axios.get('http://10.0.2.2:8000/api/vendres');
        const existingData = responsee.data;
        const duplicate = existingData.find(
          item =>
            item.idobjet === id &&
            item.email === Emaildeux &&
            item.nom === nom &&
            item.prenom === prenom &&
            item.adresseun === adresseun &&
            item.adressedeux === adressedeux &&
            item.pays === pays &&
            item.ville === ville &&
            item.codepostal === codepostal &&
            item.informations === informations &&
            item.modepaiement === modepaiement
        );
        if (duplicate) {
          Alert.alert('Warning', 'These data already exist.');
          return;
        }
    
        const response = await axios.post('http://10.0.2.2:8000/api/vendres', data);
        console.log(response.data);
        Alert.alert('Success', 'Objet vendu avec succès.');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Une erreur s\'est produite lors de la vente de l\'objet.');
      }
    };
    

const acheter = async () => {
  const data = {
  email: emaill,
  idobjet: id,
  quantite: quantite,
  qualite: qualite
  };
  try {
  const response = await axios.post('http://10.0.2.2:8000/api/historiques', data);
  console.log(response.data);
  } catch (error) {
  console.error(error);
  }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ backgroundColor:'#fff', marginVertical:5,top:45,}}>
    <View style={{ top:0}}>

    


      <View style={{top:-350,}}>
      <Text style={styles.label}>        Prenom :</Text>
      
      <View style={styles.inputContainer}>
      <Icon name="user" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
     <TextInput
         style={styles.input}
         value={name?.toString() ?? ''}
         editable={true}
         onChangeText={text => setPrenom(text)}
       /></View>
      <Text style={styles.label}>        Mode de paiement :</Text>
     <View style={styles.inputContainer}>
     <FontAwesome5 name="money-check-alt" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={modepaiement}
        editable={true}
        onChangeText={text => setModePaiement(text)}
      /></View>
<Text style={styles.label}>Id :</Text>
          <View style={styles.inputContainer}>
          <Icon name="user" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
            <TextInput
              style={styles.input}
              value={id.toString()}
              editable={true}
            />
          </View>
          <Text style={styles.label}>Email :</Text>
          <View style={styles.inputContainer}>
          <Icon name="user" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
            <TextInput
              style={styles.input}
              value={Emaildeux.toString()}
              editable={true}
            />
          </View>

</View>
<View style={{top:-350,}}>

<Text style={styles.label}>        Nom :</Text>
      
      <View style={styles.inputContainer}>
      <Icon name="user" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
     <TextInput
         style={styles.input}
         value={name?.toString() ?? ''}
         editable={true}
         onChangeText={text => setNom(text)}
       /></View>

<Text style={styles.label}>        Adresse :</Text>
     <View style={styles.inputContainer}>
     <FontAwesome5 name="house-user"  size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={adresse?.toString() ?? ''}
        editable={true}
        onChangeText={text => setAdresseUn(text)}
      /></View>
<Text style={styles.label}>        Une autre adresse :</Text>
     <View style={styles.inputContainer}>
     <FontAwesome5 name="house-user"  size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={adressedeux}
        onChangeText={text => setAdresseDeux(text)}
      /></View>

            
<Text style={styles.label}>        Pays :</Text>
     <View style={styles.inputContainer}>
     <MaterialIcons name="emoji-flags" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={pays}
        onChangeText={text => setPays(text)}
      /></View>
            
<Text style={styles.label}>        ville :</Text>
     <View style={styles.inputContainer}>
     <FontAwesome5 name="city" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={ville}
        onChangeText={text => setVille(text)}
      /></View>
<Text style={styles.label}>        Code postal :</Text>
     <View style={styles.inputContainer}>
     <MaterialCommunityIcons name="email-newsletter" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={codepostal}
        onChangeText={text => setCodePostal(text)}
      /></View>
            
<Text style={styles.label}>        Telephone :</Text>
     <View style={styles.inputContainer}>
     <Entypo name="old-phone" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={tel?.toString() ?? ''}
        editable={true}
        onChangeText={text => setTelephone(text)}
      /></View>     
<Text style={styles.label}>        Informations :</Text>
     <View style={styles.inputContainer}>
     <Ionicons name="information-circle" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
    <TextInput
        style={styles.input}
        value={informations}
        onChangeText={text => setInformations(text)}
      /></View>
            



<Text style={styles.label}>        Mode de paiement :</Text>
<View style={{top:70,left:120}}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, modepaiement === 'sur place' && styles.activeButton]}
          onPress={setPaiementSurPlace}
          activeOpacity={modepaiement === 'sur place' ? 1 : 0.2}
        >
          <Text style={styles.buttonText}>Sur place</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, modepaiement === 'en ligne' && styles.activeButton]}
          onPress={setPaiementEnLigne}
          activeOpacity={modepaiement === 'en ligne' ? 1 : 0.2}
        >
          <Text style={styles.buttonText}>En ligne</Text>
        </TouchableOpacity>
      </View>
</View>


<View style={{top:30}}>
      <TouchableOpacity style={styles.b} onPress={() => {saveCategorie();  acheter();}}>
      <Text style={styles.buttonText}>Ajouter</Text>
    </TouchableOpacity>
    </View>
   
    </View>
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainerp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkBoxLabel: {
    fontSize: 16,
    marginLeft: 8,
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
    marginHorizontal:35,
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
      left :-33,
     
      borderRadius: 10,
      padding: 2,
      paddingLeft:60,
      marginBottom: 5,
      width: '100%',
    },




    buttonContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#fff',
      padding: 10,
      marginHorizontal: 5,
      borderRadius: 5,
    
      backgroundColor: '#e7756f', 
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
    activeButton: {
      backgroundColor: '#4CAF50',
      borderWidth: 0,
      borderColor: '#4CAF50',
    },
});

 