import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert,FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Modifier = () => {
const [title, setTitle] = useState('');
const [prix, setPrix] = useState('');
const [imageUri, setImageUri] = useState(null);
const [categories, setCategories] = useState([]);
const fetchCategories = async () => {
  try {
    const response = await axios.get('http://10.0.2.2:8000/api/categories');
    setCategories(response.data);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'An error occurred while fetching categories.');
  }
};
useEffect(() => {
  fetchCategories();
}, []);



const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    const uri = result.assets[0].uri;
    setImageUri(uri);
  }
};

const saveCategorie = async () => {
  if (!title || !imageUri || !prix) {
    Alert.alert('Error', 'Please enter a title, price and select an image.');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('prix', prix);
  formData.append('image', {
    uri: imageUri,
    name: 'image.jpg',
    type: 'image/jpeg',
  });

  try {
    const response = await fetch('http://10.0.2.2:8000/api/categories', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    });

    const data = await response.json();
    Alert.alert('Success', 'Category saved successfully.');
    setTitle('');
    setPrix('');
    setImageUri(null);
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'An error occurred while saving the category.');
  }
};
const renderItem = ({ item }) => (
  <View style={{ marginBottom: 10 }}>
    <Text>{item.title}</Text>
    <Text>{item.prix} $</Text>
    {item.image && <Image source={{ uri: `http://10.0.2.2:8000/storage/${item.image}` }} style={{ width: 200, height: 200 }} />}
  </View>
);

return (
<View>
<Text>Title:</Text>
<TextInput value={title} onChangeText={setTitle} />
<TextInput value={prix} onChangeText={setPrix} />
<Button title="Pick an image" onPress={pickImage} />

{imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

<Button title="Save" onPress={saveCategorie} />
<FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
</View>
);
};

export default Modifier;