import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity,StyleSheet, ImageBackground, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const Modifierpoint = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:8000/api/pcollectes');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Modif', { id: item.id })}>
      <View style={styles.item}>
        <Text style={{ flex: 1, fontSize: 16, fontWeight: 'bold',backgroundColor: '#8ED332', color: 'white', marginRight:60,paddingVertical: 10,borderRadius: 5,opacity: 0.9,}}>  {item.title}</Text>
        <Icon name="edit" size={30} color="#8ED332" onPress={() => navigation.navigate('Modif', { id: item.id })} style={{ right :50,}}/>
      </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
      <ImageBackground  source={require('./assets/backpoint2.png')}  style={styles.backgroundImage}>
<Text style={styles.tx0}>                              Modifier {'\n'}                             des points {'\n'}                             du collecte</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={{ height: '100%',top:50,left: 20,marginVertical:70, }}
      />
      </ImageBackground>
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 //   paddingHorizontal: 10,
    paddingVertical: 20,
  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 615,
    top:-20,
  },
  tx0:{
    top:50,
    fontSize: 30,
    fontWeight: 'bold',
    right:20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
  },
  title: {
    fontSize: 16,
  },
});

export default Modifierpoint;
