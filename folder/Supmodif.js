import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
const Stack = createStackNavigator();


export default function Supmodif({ navigation, route }) {
 
  const [categories, setCategories] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [Title, setTitle] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [qualite, setQualite] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");

  const { email } = route.params || {};

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/objets');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while fetching categories.');
    }
  };
  useEffect(() => {

    fetchCategories();
    console.log(email);
  }, []);

  const handleDelete = async (itemId) => {
    try {
    await axios.delete(`http://10.0.2.2:8000/api/objets/${itemId}`);
    fetchCategories();
    Alert.alert('Success', 'L\'élément a été supprimé avec succès.');
    } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Une erreur est survenue lors de la suppression de l\'élément.');
    }
    };

  const renderItem = ({ item }) => {
  if (item.email === email) {
    return (
      <View style={{ marginBottom: 10, borderWidth: 1, borderColor: '#fff', marginRight:20, backgroundColor:'#fff', top:10, height:150, borderRadius: 15 }}>
      <View style={{ marginHorizontal:0 }}>
      {item.image && (
      <Image
      source={{ uri: `http://10.0.2.2:8000/storage/${item.image}` }}
      style={{ width: 100, height: 100, marginRight: 10, marginLeft: 10, top:20, borderRadius: 100, left:10, }}
      />
      )}
      <View  style={{top:-100,left:130,}}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, left:10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', top:20 }}>{item.quantite}</Text>
      </View>
      <View style={{ justifyContent: 'space-between', marginTop: 10, top:20, left:10 }}>
      <Text style={{ fontSize: 16 }}>Prix: {item.prix}</Text>
      <Text style={{ fontSize: 16, color:'#0008' }}>Qualité: {item.qualite}</Text>
      </View>

</View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
      <Feather name="trash-2" size={32} color="#8ED332" style={{ top:-160,left:310}} />
      </TouchableOpacity>



      <TouchableOpacity onPress={() => navigation.navigate('Modifier', { id: item.id })}>
      <View style={styles.item}>
        <Icon name="edit" size={32} color="#8ED332" onPress={() => navigation.navigate('Modifier', { type:item.type,adresse:item.adresse,email:item.email, id: item.id, title:item.title, qualite :item.quantite, quantite:item.quantite, prix:item.prix, description:item.description })} style={{ top:-140,left:310}}/>
      </View>
    </TouchableOpacity>

      </View>

        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#8ED332',
  },
  list:{
    marginHorizontal:10,
    left:10,
    
  },
});
