import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';

const API_URL = 'http://10.0.2.2:8000/api/categories';

export default function Ajouter() {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async () => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    await fetchCategories();
    setTitle('');
  };

  const renderItem = ({ item }) => <Text>{item.title}</Text>;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Button title="Add" onPress={addCategory} />
      <FlatList data={categories} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
});
