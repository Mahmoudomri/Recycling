import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();

export default function Objet({ navigation, route }) {
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [Title, setTitle] = useState("");
 // const [id, setId] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [qualite, setQualite] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");
  const { title } = route.params || {};
  const { email } = route.params || {};
  const gmail = email;
  const [favori, setFavori] = useState(false);
  const [favories, setFavories] = useState([]);
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };



  
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
    async function fetchFavorie() {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/favories');
        setFavories(response.data);
        const isInFavorites = response.data.some(f => f.email === email && f.quantite === quantite && f.qualite === qualite);
        setFavori(isInFavorites);
      } catch (error) {
        console.error(error);
      }
    }
   
    fetchFavorie();
    fetchCategories();
    console.log(email);
  }, []);


  const filteredCategories = categories.filter(item => item.quantite.includes(searchText));

  const renderItem = ({ item }) => {
    if (item.title === title && filteredCategories.includes(item)) {
      return (
        
        <View style={{ marginBottom: 10,  borderWidth: 1,  borderColor: '#fff', marginRight:20,backgroundColor:'#fff',top:10,height:300, borderRadius: 15,flexWrap: 'nowrap' }}>
         
         <View  style={{ marginHorizontal:0,}}>
      
          <TouchableOpacity onPress={() => navigation.navigate('Achat', { id:item.id,title: item.title, image: item.image , quantite:item.quantite, qualite: item.qualite, prix:item.prix, description:item.description,email:gmail,Emaildeux:item.email})}>
          {item.image && (
            <Image
              source={{ uri: `http://10.0.2.2:8000/storage/${item.image}` }}
              style={{ width: 160, height: 160, marginRight: 10, marginLeft: 10,top:20,  borderRadius: 15,}}
            />
          )}
           
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, left:10, }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold',top:20, }}>{item.quantite}</Text>
          </View>
          <View style={{  justifyContent: 'space-between', marginTop: 10 ,top:20, left:10, }}>
            <Text style={{ fontSize: 16 }}> Prix: {item.prix}</Text>
            <Text style={{ fontSize: 16, color:'#0008'}}> Qualité: {item.qualite}</Text>
          </View>
</View>

        </View>
      );
    } else {
      return null;
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
    
        <TextInput
          style={styles.searchInput}
          placeholder="Recherche"
          value={searchText}
          onChangeText={setSearchText}
        /> 
        <Icon name="search" size={27} color="#8ED332" style={styles.searchIcon}   />
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
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
    
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    position: 'absolute',
    top:17,
    left: 360,
  },
});
