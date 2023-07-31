import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Alert, alert,TouchableOpacity,ImageBackground} from 'react-native';
import axios from 'axios';
const API_URL = 'http://10.0.2.2:8000/api/soustitles';

const Pagetroisd = ({ navigation,route  }) => {
  const { email } = route.params || {};
  const { title } = route.params || {};
  const gmail = email;
  const titre = title;
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/soustitles');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred while fetching categories.');
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const renderItem = ({ item }) => {
    console.log(item); // Add this line
    return (
      <TouchableOpacity onPress={() => navigation.navigate('BarObjet', { title: item.titledeux, email:gmail })}>
        <View style={{ marginBottom: 10 }}>
          {item.image && <Image source={{ uri: `http://10.0.2.2:8000/storage/${item.image}` }} style={{ width: 100, height: 100 , marginRight:30,marginLeft:30,}} />}
          <Text style={styles.tx0}>{item.titledeux}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  


  return (
    <View style={styles.container}>
       <ImageBackground  source={require('./assets/back3.png')}  style={styles.backgroundImage}>
       <Text >{'\n'}{'\n'}</Text>
          <Text style={styles.tx}>Sous Catégories</Text>
          <Text >{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        style={styles.list}
      />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  tx: {
    top:-20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontSize:30,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
   // height: 900,
    top:-20,
    left:-10,
  },
  list:{
top:-80,
left:50,
height:'100%',
width:'100%',
  },
  categoryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    height: 200,
  },
  categoryImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  tx0: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize:20,
    color: '#fff',
  },
});

export default Pagetroisd;
