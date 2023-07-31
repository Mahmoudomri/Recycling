
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as React from 'react';
import axios from 'axios';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity,Linking ,ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';



const MenuScreen = () => {

  const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [place, setPlace] = useState('');
const [image, setImage] = useState(null);
const [pcollecte, setPcollecte] = useState([]);

useEffect(() => {
  async function fetchImages() {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/pcollectes');
      setPcollecte(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  fetchImages();
}, []); 


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
     
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        
        <TouchableOpacity onPress={() => Linking.openURL(item.place)}>
  <Text style={styles.itemPlace2}> URL : <Text style={styles.itemPlace}>{item.place}</Text></Text>
</TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View> 
      <ImageBackground  source={require('./assets/back3.png')}  style={styles.backgroundImage}>
      <Text style={styles.titlee}>Liste des Pointes de collectes{'\n'}</Text>
    <FlatList
      data={pcollecte}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
     <Text style={{top:0,   fontSize: 25,
    fontWeight: 'bold',
    marginBottom: -14,
    marginHorizontal:50,
    textAlign: 'center',
    top:40,
    color:"#fff",}}> {'\n'} {'\n'}</Text>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    marginVertical:10,
    top:11,
    marginHorizontal:20,
   
  },
  titlee: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal:50,
    textAlign: 'center',
    top:40,
    color:"#fff",
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 415,
    height: 630,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F8FCF3',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height:300,
  
    
  },
  itemImage: {
    width: 200,
    height: 300,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  itemTextContainer: {
    flex: 1,
    top:10,
    padding: 8,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
  },
  itemPlace: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color:'blue',
    
  },
  itemPlace2: {
    fontSize: 14,
    top : 8,
    
  },
});

export default MenuScreen;
