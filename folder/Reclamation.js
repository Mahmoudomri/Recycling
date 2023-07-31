import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform, Alert,ImageBackground } from 'react-native';
import { Linking } from 'expo';
import * as MailComposer from 'expo-mail-composer';

export default function Reclamation() {
  const [objet, setObjet] = useState('');
  const [description, setDescription] = useState('');

  const handlePress = async () => {
    if (await MailComposer.isAvailableAsync()) {
      const mailOptions = {
        recipients: ['chrifkhouloud22@gmail.com'],
        subject: objet,
        body: description,
      };

      try {
        await MailComposer.composeAsync(mailOptions);
      } catch (error) {
        Alert.alert(
          'Erreur',
          'Impossible d\'envoyer la réclamation. Veuillez configurer votre application de messagerie par défaut.',
          [{ text: 'OK' }],
        );
      }
    } else {
      Alert.alert(
        'Erreur',
        'Aucune application de messagerie n\'est disponible sur votre appareil.',
        [{ text: 'OK' }],
      );
    }
  };

  return (
    <View style={styles.container}>
         <ImageBackground  source={require('./assets/reclamation.png')}  style={styles.backgroundImage}>
      
      <Text >{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      <View style={styles.form}>
        
        <TextInput
          style={styles.input}
          onChangeText={setObjet}
          value={objet}
          placeholder="Objet"
        />
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
          placeholder="Description"
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.b}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Envoyer la réclamation</Text>
        </TouchableOpacity>


      </View>
      </ImageBackground>
    </View>
  );
}


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
},
form: {
width: '80%',
left:40,
top:30,
},

buttonText: {
color: '#8ED332',
textAlign: 'center',
fontWeight: 'bold',
fontSize:20,
},
b:{
    backgroundColor: '#fff', 
    width: '80%',
    alignItems: 'center',
    top:30,
    right:40,
    left:40,
    paddingHorizontal: 0,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
    padding:15,
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


  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:40,
    height:45,
    maxHeight:70,

    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor:'#fff',
    borderRadius: 35,
    paddingHorizontal: 5,
    top:35,
    borderRadius: 18,
 
    opacity: 0.8,
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),},
    input: {
      borderWidth: 1.5,
      borderColor: '#fff',
      backgroundColor:'#fff',
      borderRadius: 4,
      padding: 2,
      marginBottom: 10,
      width: '100%',
    },
});/*
*/