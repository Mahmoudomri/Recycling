import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,ImageBackground, ScrollView ,} from 'react-native';
import axios from 'axios';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const Modif = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [image, setImage] = useState('');
  const [opacity, setOpacity] = useState(0.5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const id = route.params.id;
    try {
      const response = await axios.get(`http://10.0.2.2:8000/api/pcollectes/${id}`);
      const { title, description, place, image } = response.data;
      setTitle(title);
      setDescription(description);
      setPlace(place);
      setImage(image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const id = route.params.id;
    const updatedData = { title, description, place, image };
    try {
      const response = await axios.put(`http://10.0.2.2:8000/api/pcollectes/${id}`, updatedData);
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <ScrollView style={{ height: '100%',width:'100%',}}>
    <View style={styles.container}>
      <View style={styles.form}>
      <ImageBackground  source={require('./assets/backpoint2.png')}  style={styles.backgroundImage}>

<Text style={styles.tx0}>                              Modifier {'\n'}                             des points {'\n'}                             du collecte</Text>
    {/*
      Champ de titre
    */}
    
   <View  style={{ top:60,}}>
    <Text style={styles.label}>     Titre :</Text>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={title}
      onChangeText={setTitle}
      placeholder="Entrez un titre"
    /></View>

    {/*
      Champ de description
    */}
    <Text style={styles.label}>     Description :</Text>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={description}
      onChangeText={setDescription}
      placeholder="Entrez une description"
      multiline={true}
      numberOfLines={4}
    /></View>

    {/*
      Champ de lieu
    */}
    <Text style={styles.label}>     URL du point de collecte :</Text>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={place}
      onChangeText={setPlace}
      placeholder="Entrez un lieu"
    /></View>

    {/*
      Champ d'image
    */}
    <Text style={styles.label}>     Image du point de collecte :</Text>
    <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={image}
      onChangeText={setImage}
      placeholder="Entrez une URL d'image"
    /></View>

    {/*
      Bouton de soumission
    */}
    <TouchableOpacity style={[styles.button,]} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Modifier</Text>
    </TouchableOpacity>
    </View>
    </ImageBackground>
  </View>
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
  //  paddingHorizontal: 10,
    paddingVertical: 20,
    top:-60,
    },
    form: {
    flex: 1,
    
    },
    backgroundImage: {
        resizeMode: 'cover',
        justifyContent: 'center',
        width: 420,
        height: 740,
      },
      tx0:{
        top:50,
        fontSize: 30,
        fontWeight: 'bold',
        right:20,
      },
    label: {
    fontSize: 15,
    left:30,
    top:40,
    fontWeight: 'bold',
    color:'#000',
    },
    
    button: {
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
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    },
    
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal:40,
       right:15,
        borderWidth: 1,
        borderColor: '#8ED332',
        borderRadius: 5,
        paddingHorizontal: 5,
        top:40,
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
          borderWidth: 0,
          borderColor: '#8ED332',
          borderRadius: 4,
          padding: 10,
          marginBottom: 10,
          height:'100%',
          width: '100%',
        },
    });

export default Modif;