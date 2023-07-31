

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,TouchableOpacity,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const StripeApp = () => {
  const [number, setNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handlePress = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvc,
          amount: amount,
          description: description,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>        Numéro de carte :</Text>
         <View style={styles.inputContainer}>
         <FontAwesome name="credit-card-alt" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
      <TextInput
        style={styles.input}
        placeholder="Numéro de carte"
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />
      </View>
      <Text style={styles.label}>        Moins d'expiration :</Text>
      <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="credit-card-clock" size={35} color="#fff" style={{marginRight: 10, left:20,}} />
      <TextInput
        style={styles.input}
        placeholder="Mois d'expiration"
        keyboardType="numeric"
        value={expMonth}
        onChangeText={setExpMonth}
      />
      </View>
      <Text style={styles.label}>        Année d'expiration :</Text>
      <View style={styles.inputContainer}>
      <MaterialCommunityIcons name="credit-card-clock" size={35} color="#fff" style={{marginRight: 10, left:20,}} />
     
      <TextInput
        style={styles.input}
        placeholder="Année d'expiration"
        keyboardType="numeric"
        value={expYear}
        onChangeText={setExpYear}
      /></View>

<Text style={styles.label}>        Code de sécurité :</Text>
        <View style={styles.inputContainer}>
        <Fontisto name="key" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
     
      <TextInput
        style={styles.input}
        placeholder="Code de sécurité (CVC)"
        keyboardType="numeric"
        value={cvc}
        onChangeText={setCvc}
      /></View>
      <Text style={styles.label}>        Montant :</Text>
        <View style={styles.inputContainer}>
        <MaterialIcons name="monetization-on" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
     
      <TextInput
        style={styles.input}
        placeholder="Montant"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      /></View>
      <Text style={styles.label}>        Description :</Text>
        <View style={styles.inputContainer}>
     <Ionicons name="information-circle" size={25} color="#fff" style={{marginRight: 10, left:20,}} />
     
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      /></View>

<TouchableOpacity style={styles.b} onPress={() => {handlePress(); }}>
      <Text style={styles.buttonText}>Payer</Text>
    </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:0,
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

 
export default StripeApp;
