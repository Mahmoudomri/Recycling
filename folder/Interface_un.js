import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, Button, TouchableOpacity } from 'react-native';
import i1 from './assets/i1.png';
import i2 from './assets/i2.png';
import i3 from './assets/i3.png';
const { width } = Dimensions.get('window');
const images = [
  { uri: i1 },
  { uri: i2 },
  { uri: i3 },
];
const Carousel = ({navigation}) => {
  const [active, setActive] = useState(0);
const change = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    if (slide !== active) {
      setActive(slide);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}>
        {images.map((image, index) => (
          <Image key={index} source={image.uri} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((i, k) => (
          <Text key={k} style={k === active ? styles.pagingActiveText : styles.pagingText}>
            ⬤
          </Text>
        ))}
      <View >
    
        </View>
        <TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('Login')}
>
  <Text style={{ color: '#68C238', fontSize:25,  fontWeight: 'bold',}}>S'identifier{'\n'}</Text>
</TouchableOpacity>
      </View>
      
    </View>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
  },
   
  scroll: {
    width,
    height: 250,
    
  },
  image: {
    width: 411,
    height: 590,
   
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 52,
    alignSelf: 'center',
    left:180,
  },
  pagingText: {
    fontSize: width / 30,
    margin: 3,
    color:'#96D474'
    
  },
  pagingActiveText: {
    fontSize: width / 30,
    color: '#fff',
    margin: 3,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 0,
    paddingVertical:0,
    paddingHorizontal:0,
    marginVertical: 0,
    narginLeft:0,
    marginRight:0,
    alignItems: 'center',
    top:60,
    right:90,
  },
  
});

export default Carousel;