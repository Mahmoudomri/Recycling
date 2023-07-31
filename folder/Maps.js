import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions,FlatList,TouchableOpacity,Image,ScrollView,TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';


export default function Maps({ navigation, route }) {
  const [users, setUsers] = useState([]);
  const { title } = route.params || {};
  const { email } = route.params || {};
  const gmail = email;
  const titre = title;
  const handleFilterButtonPress = () => {
    // Implement filter logic here
    console.log("Filter button pressed");
  };

  const handleListButtonPress = () => {
    // Implement list logic here
    console.log("List button pressed");
  };
  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/objets')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Geocode addresses using OpenStreetMap Nominatim API
        Promise.all(data.map(user =>
          fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(user.adresse)}&format=json`)
            .then(response => response.json())
            .then(data => {
              if (data.length > 0) {
                return {
                  ...user,
                  latitude: parseFloat(data[0].lat),
                  longitude: parseFloat(data[0].lon),
                  description: data[0].display_name,
                };
              } else {
                return null;
              }
            })
        ))
        .then(users => setUsers(users.filter(user => user)));
      })
      .catch(error => console.error(error));
  }, []);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapViewRef = React.useRef(null);
  
  const handleMapPress = () => {
    setSelectedMarker(null);
  };
  
  return (
    <View style={styles.container}>




      <View style={styles.mapContainer}>
        
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 34.0,
            longitude: 9.0,
            latitudeDelta: 6,
            longitudeDelta: 6,
          }}
          onMapReady={() => {
            if (users.length > 0) {
              mapViewRef.current.fitToCoordinates(
                users.map((user) => ({
                  latitude: user.latitude,
                  longitude: user.longitude,
                })),
                {
                  edgePadding: {
                    top: 50,
                    right: 50,
                    bottom: 50,
                    left: 50,
                  },
                  animated: true,
                }
              );
            }
          }}
          ref={mapViewRef}
          onPress={handleMapPress} // add onPress event listener to MapView
        >
          {users.map((user) => {
            console.log(user.adresse);
            if (user.title === title) {
              return (
                <Marker
                  key={user.id}
                  coordinate={{
                    latitude: user.latitude,
                    longitude: user.longitude,
                  }}
                  title={user.adresse}
                  description={user.description}
                  onPress={() => {
                    if (user.adresse === selectedMarker?.title) {
                      setSelectedMarker(null);
                    } else if (user.adresse === selectedMarker?.title) {
                      setSelectedMarker(null);
                    } else {
                      setSelectedMarker(
                        users.filter(
                          (item) =>
                            item.adresse === user.adresse && item.title === title
                        )
                      );
                    }
                  }}
                >
                  <FontAwesome name="recycle" size={30} color="green" />
                </Marker>
              );
            }
            return null;
          })}
          
        </MapView>
        

       <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
 
            navigation.navigate('Filter', { title: titre, email:gmail });
            handleFilterButtonPress();
          }}
        >
          <FontAwesome name="filter" size={20} color="#333" style={styles.buttonIcon} />
          <Text>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
       
          onPress={() => {
 
            navigation.navigate('Objet', { title: titre, email:gmail });
            handleListButtonPress();
          }}
        >
          <FontAwesome name="list" size={20} color="#333" style={styles.buttonIcon} />
          <Text>List</Text>
        </TouchableOpacity>
      </View>
      </View>
      {selectedMarker && (
        <View style={styles.scrollViewContainer}>
          <ScrollView>
            {selectedMarker?.map((item) => (
              <View
                key={item.id}
                style={{
                  backgroundColor: "#b0fd87",
                  marginBottom: 10,
                  marginTop: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  borderRadius: 25,
                  height: 110,
                }}
              >
                {item.image && (
                  <Image
                    source={{
                      uri: `http://10.0.2.2:8000/storage/${item.image}`,
                    }}
                    style={{
                      width: 90,
                      height: 90,
                      marginRight: 10,
                      marginLeft: 40,
                      top: 10,
                      borderRadius: 50,
                    }}
                  />
                )}
                <View style={{ top: -75, left: 150 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Prix: <Text>{item.prix}</Text>
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Quantité: <Text>{item.quantite}</Text>
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Qualité: <Text>{item.qualite}</Text>
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
  

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  mapContainer: {
 
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollViewContainer: {
    height: 130,
    marginTop: 5,
    marginBottom: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
  left:10,
    flexDirection: 'row',
    
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonIcon: {
    marginRight: 10,
  },
});