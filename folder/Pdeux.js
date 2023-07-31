import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
//import * as Location from 'expo-location';
const Pdeux = ({navigation}) => {
  const [userCount, setUserCount] = useState(0);
  const [recycleCount, setRecycleCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRecyclingOrders, setTotalRecyclingOrders] = useState(0);
  const [users, setUsers] = useState([]);
  const [userLocations, setUserLocations] = useState([]);



  
  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/signup')
      .then((response) => response.json())
      .then((json) => {
        setUserCount(json.count);
      })
      .catch((error) => console.error(error));

    fetch('http://10.0.2.2:8000/api/vendres')
      .then((response) => response.json())
      .then((json) => {
        setRecycleCount(json.count);
      })
      .catch((error) => console.error(error));


      fetch('http://10.0.2.2:8000/api/signup')
      .then(response => response.json())
      .then(data => setTotalUsers(data.length));

    fetch('http://10.0.2.2:8000/api/vendres')
      .then(response => response.json())
      .then(data => setTotalRecyclingOrders(data.length));


    
  }, []);




  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Card containerStyle={{ borderRadius: 10, shadowColor: 'red',shadowOffset: {width: 10, height: 12},shadowOpacity: 10,  shadowRadius: 2, elevation: 2,}}>
        <View style={{ flexDirection: 'row', alignItems: 'center',marginHorizontal:30,marginVertical:30, shadowColor: 'red',shadowOffset: {width: 100, height: 120},shadowOpacity: 10,  shadowRadius: 2, elevation: 2,}}>
          <Icon name="user" type="font-awesome" size={50} />
          <Text style={{ marginLeft: 10,fontSize:20, textAlign: 'center',alignSelf: 'center', }}>Nombre total d'utilisateurs inscrits :  <Text style={{ fontWeight:'bold',color:'red'}}>{totalUsers}</Text></Text>
        </View>
      </Card>

      <Card containerStyle={{ borderRadius: 10, marginTop: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' ,marginHorizontal:0,marginVertical:30, }}>
          <Icon name="recycle" type="font-awesome-5" size={50} />
          <Text style={{ marginLeft: 10,fontSize:20,     textAlign: 'center',alignSelf: 'center',}}>Nombre total de commandes de recyclage effectuées :  <Text style={{ fontWeight:'bold',color:'red'}}>{totalRecyclingOrders}</Text></Text>
        </View>
      </Card>
  
      <View style={{ flex: 1 }}>
    
      <MapView style={{ flex: 1 }} region={{ latitude: 48.8691, longitude: 2.334 }}>
        {userLocations.map((location) => (
          <Marker
            key={location.location}
            AIRMapMaker={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.location}
            description={`Nombre d'utilisateurs: ${location.count}`}
          />
        ))}
      </MapView>
    </View>
    
    <TouchableOpacity style={styles.b} onPress={() => {
 
 navigation.navigate('Pdeuxx');
}}>
 <Text style={styles.buttonText}>La répartition géographique des utilisateurs de l'application</Text>
</TouchableOpacity>


    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
b:{
    backgroundColor: 'red', 
    padding: 10,
  //  width: '50%',
    alignItems: 'center',
    top:-30,
   // right:40,
   // left:100,
   // paddingHorizontal: 0,
   // paddingVertical: 10,
    marginHorizontal:80,
    marginVertical:20,
   // marginTop: 20,
    borderRadius: 25,
  },
});
export default Pdeux;