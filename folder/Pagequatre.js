import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, Alert,TouchableOpacity,ImageBackground } from 'react-native';
import 'react-native-gesture-handler';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function Pagequatre({ navigation, route }) {
  const [historiques, setHistoriques] = useState([]);
  const [vendres, setVendres] = useState([]);
  const [objet, setObjet] = useState([]);
  const { email } = route.params || {};

  useEffect(() => {
    async function fetchHistoriques() {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/historiques');
        setHistoriques(response.data);
      } catch (error) {
        console.error(error);
      }
    }
 
    async function fetchObjet() {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/objets');
        setObjet(response.data);
      } catch (error) {
        console.log(error);
        console.log(objet);
        Alert.alert('Error', 'An error occurred while fetching categories.');
      }
    }

    fetchHistoriques();
    fetchObjet();
  }, []);

  const removeHistorique = async (item) => {
    try {
      await axios.delete(`http://10.0.2.2:8000/api/historiques/${item.id}`);
      const newHistoriques = historiques.filter((h) => h.id !== item.id);
      setHistoriques(newHistoriques);
      Alert.alert('Success', 'Item has been removed from history.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while removing item from history.');
    }
  }
  
  const removeVendre = async (item) => {
    try {
      await axios.delete(`http://10.0.2.2:8000/api/vendres/${item.idobjet}`);
      const newVendres = vendres.filter((v) => v.idobjet !== item.idobjet);
      setVendres(newVendres);
      Alert.alert('Success', 'L\'article a été retiré de la vente.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while removing item from vendres.');
    }
  }
  
  const displayObject = (item) => {
    for (let i = 0; i < objet.length; i++) {
      if (objet[i].quantite === item.quantite && objet[i].qualite === item.qualite) {
        return (
          <View style={styles.item}>
            <Image
              source={{ uri: `http://10.0.2.2:8000/storage/${objet[i].image}` }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text style={styles.title}>quantite : {objet[i].quantite}</Text>
              <Text style={styles.title}>qualite : {objet[i].qualite}</Text>
              <Text style={styles.price}>{objet[i].prix} €</Text>
            </View>
            <TouchableOpacity onPress={() => { removeHistorique(item); removeVendre(item); }}>
              <MaterialCommunityIcons
                name="delete"
                size={35}
                color="#8ED339"
                style={styles.delete}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }
    return null;
  }
  return (
    <View style={styles.container}>
       <ImageBackground  source={require('./assets/back3.png')}  style={styles.backgroundImage}>
       <Text style={styles.titlee}>Liste des achats</Text>
      <FlatList
        data={historiques}
        keyExtractor={item => item.id.toString()}
        style={{ marginVertical:10,top:11,marginHorizontal:20,}}
        renderItem={({ item }) => {
          if (item.email === email) {
            return (
              <View style={styles.itemContainer}>
                {displayObject(item)}
              </View>
            );
          }
          return null;
        }}
      />
      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  titlee: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal:50,
    textAlign: 'center',
    top:20,
    color:"#fff",
  },
  itemContainer: {
    marginVertical: 10,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 415,
    height: 630,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  delete: {
   // width: 20,
   // height: 20,
    marginLeft: 10,
    right:20,
  },

});
