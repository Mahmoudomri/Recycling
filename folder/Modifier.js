import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,ImageBackground } from 'react-native';
import axios from 'axios';

const Modifier = ({ navigation, route }) => {

  const { id } = route.params || {};
  const { title, type, adresse, email, prix, quantite, qualite, description } = route.params || {};

  const [newTitle, setNewTitle] = useState(title);
  const [newType, setNewType] = useState(type);
  const [newAdresse, setNewAdresse] = useState(adresse);
  const [newEmail, setNewEmail] = useState(email);
  const [newPrix, setNewPrix] = useState(prix);
  const [newQuantite, setNewQuantite] = useState(quantite);
  const [newQualite, setNewQualite] = useState(qualite);
  const [newDescription, setNewDescription] = useState(description);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`http://10.0.2.2:8000/api/objets/${id}`, {
        title: newTitle,
        type: newType,
        adresse: newAdresse,
        email: newEmail,
        prix: newPrix,
        quantite: newQuantite,
        qualite: newQualite,
        description: newDescription,
      });
      navigation.goBack();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView style={{ backgroundColor:'#fff', marginVertical:5,top:45,}}>
  <View style={{ top:-90}}>
    <View style={{top:-200}}>
  <Text style={styles.label}>        Email :</Text>
     <View style={styles.inputContainer}> 
          <TextInput
            style={styles.input}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Email"
          />
          </View></View>
       <Text style={styles.label}>        Type :</Text>
     <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={setNewTitle}
            placeholder="Title"
          />
          </View>

          <Text style={styles.label}>        Titre :</Text>
     <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newType}
            onChangeText={setNewType}
            placeholder="Type"
          />
          </View>


          <Text style={styles.label}>        Adresse :</Text>
     <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newAdresse}
            onChangeText={setNewAdresse}
            placeholder="Adresse"
          />
              </View>

     


           <Text style={styles.label}>        Prix :</Text>
     <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPrix}
            onChangeText={setNewPrix}
            placeholder="Prix"
            keyboardType="numeric"
          /></View>


<Text style={styles.label}>        Quantité :</Text>
     <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newQuantite}
            onChangeText={setNewQuantite}
            placeholder="Quantite"
            keyboardType="numeric"
          />
          </View>


          <Text style={styles.label}>        Qualité :</Text>
     <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newQualite}
            onChangeText={setNewQualite}
            placeholder="Qualite"
          />
          </View>
          <Text style={styles.label}>        Description :</Text>
     <View style={styles.inputContainer}>


          <TextInput
            style={styles.input}
            value={newDescription}
            onChangeText={setNewDescription}
            placeholder="Description"
          />
               </View>
          <TouchableOpacity
            style={styles.b}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{
"Update" }</Text>
</TouchableOpacity>
<Text style={{backgroundColor:'#fff',top:30,}}>{'\n'}</Text>
{error && <Text style={styles.errorText}>Error: {error.message}</Text>}

</View>
</ScrollView>
</View>
);
};

const styles = StyleSheet.create({

backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 620,
  },container: {
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

export default Modifier;