import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const Modifff = ({ route, navigation }) => {
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
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Select Image" onPress={selectImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
     
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

export default Modifff;
