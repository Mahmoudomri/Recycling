import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TextInput, TouchableOpacity,Button,Image,StyleSheet, ImageBackground, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Modiff = ({ route, navigation }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);



  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const id = route.params.id;
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/categories/${id}`);
      const { title, image } = response.data;
      setTitle(title);
      setImage(image);
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleUpdate = async () => {
    const id = route.params.id;
    const updatedData = { title, image };
    try {
      const response = await axios.put(`http://10.0.2.2:8000/api/categories/${id}`, updatedData);
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };
    
  
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };


  return (
    <View style={styles.container}>
     <ImageBackground  source={require('./assets/backpoint2.png')}  style={styles.backgroundImage}>
<Text style={styles.tx0}>                               Modifier {'\n'}                           une categorie</Text>

     <Text style={styles.label}>        Categorie :</Text>
     <View style={styles.inputContainer}>
    <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      /></View>
      
      <Text style={styles.label}>        Choisir l'icon de la catégorie :</Text>
 



      
      <TouchableOpacity style={styles.button}  onPress={selectImage}>
        
      <Image source={require('./assets/camera.png')} />
    </TouchableOpacity>

    {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100, left: 150, top: -20, }} />}

      <TouchableOpacity style={styles.b}  onPress={handleUpdate}>
      <Text style={styles.buttonText}>Modifier</Text>
    </TouchableOpacity>


      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingHorizontal: 10,
    paddingVertical: 20,
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
    top:-20,
  },
  tx0:{
    top:70,
    fontSize: 30,
    fontWeight: 'bold',
    right:20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    top : 0,
  },
  title: {
    fontSize: 16,
  },
  b:{
    backgroundColor: '#8ED332', 
    padding: 10,
    width: '50%',
    alignItems: 'center',
    top:60,
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
  },
  button: {
 
    top:60,
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
      padding: 10,
      marginBottom: 10,
      width: '100%',
    },
});

export default Modiff;
