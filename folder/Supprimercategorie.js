import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet, ImageBackground, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'http://10.0.2.2:8000/api/categories';

const Supprimercategorie = ({navigation}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(API_URL + '/' + id, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
     
      <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold',backgroundColor: '#8ED332', color: 'white', marginRight:60,paddingVertical: 10,borderRadius: 5,opacity: 0.9,}}>  {item.title}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ right :50,}}>
        <Ionicons name="trash" size={30} color="#8ED332" />
      </TouchableOpacity>
    </View>
  );

  return (

    <View >

<ImageBackground  source={require('./assets/backpoint3.png')}  style={styles.backgroundImage}>
<Text style={styles.tx0}>                               Supprimer {'\n'}                           une categorie</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      
        style={{ height: '100%',top:80,left: 20,marginVertical:70, }}
      />
 <Text >{'\n'}</Text>
</ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  b:{
    backgroundColor: '#8ED332', 
    padding: 10,
    width: '50%',
    alignItems: 'center',
    top:-25,
    right:40,
    left:100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 615,
  },
  tx0:{
    top:70,
    fontSize: 30,
    fontWeight: 'bold',
    right:20,
  },
  ab:{
top: 150,
left: 20,

  },
  
});
export default Supprimercategorie;
/* <TouchableOpacity style={styles.b} onPress={() => navigation.navigate('Supprimersouscategories')}>
      <Text style={styles.buttonText}>Sous categorie</Text>
    </TouchableOpacity>
    */