import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Pdeuxx() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://10.0.2.2:8000/api/signup')
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

  const mapViewRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Text style={{ padding:20, fontSize:25, textAlign: 'center',alignSelf: 'center', fontWeight:'bold' }}>   La répartition géographique des utilisateurs de l'application   </Text>
      
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 34.00,
            longitude: 9.00,
            latitudeDelta: 6,
            longitudeDelta: 6,
          }}
          onMapReady={() => {
            if (users.length > 0) {
              mapViewRef.current.fitToCoordinates(
                users.map(user => ({
                  latitude: user.latitude,
                  longitude: user.longitude,
                })),
                {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                }
              );
            }
          }}
          ref={mapViewRef}
        >
          {users.map(user => {
            console.log(user.adresse);
            return (
              <Marker
                key={user.id}
                coordinate={{
                  latitude: user.latitude,
                  longitude: user.longitude,
                }}
                title={user.name}
                description={user.adresse}
              />
            );
          })}
        </MapView>
      </View>
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
