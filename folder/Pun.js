import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Pun() {
  const [totalCollectPoints, setTotalCollectPoints] = useState(0);

  useEffect(() => {
    axios.get('http://10.0.2.2:8000/api/pcollectes')
      .then(response => {
        setTotalCollectPoints(response.data.length);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.number}>{totalCollectPoints}</Text>
      </View>
      <Text style={styles.text}>Nombre total de points de collecte disponibles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
