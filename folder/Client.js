import React, { useState, useEffect } from 'react';
import { FlatList,StyleSheet, Text, View,Image,ImageBackground } from 'react-native';
import { Ionicons, MaterialIcons,AntDesign  } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Client = ({ route }) => {
  const { email } = route.params || {};
  const [objets, setObjets] = useState([]);
  const [vendres, setVendres] = useState([]);
  const [objetId, setObjetId] = useState(null); // declare objetId at the component level

  useEffect(() => {
    fetch(`http://10.0.2.2:8000/api/objets?email=${email}`)
      .then(response => response.json())
      .then(data => setObjets(data))
      .catch(error => console.error(error));

    fetch(`http://10.0.2.2:8000/api/vendres`)
      .then(response => response.json())
      .then(data => setVendres(data))
      .catch(error => console.error(error));
  }, []);

const getObjetInfo = (idObjet) => {
    const objet = objets.find(objet => objet.id == idObjet && objet.email == email);
    if (objet) {
      return (
        <>
       
           
            <View style={{top:0, height :230}}>
          {objet.image && (
            <Image
              source={{ uri: `http://10.0.2.2:8000/storage/${objet.image}` }}
              style={{ width: 100, height: 100, marginRight: 10, marginLeft: 10,top:30,  borderRadius: 100,left : 20,}}
            />
          )}
          <View style={{left:150,top:-55,}}>
          <Text style={{fontSize:16,fontWeight:'bold',}}>Prix : {objet.prix}</Text>
          <Text style={{fontSize:16,fontWeight:'bold',}}>Qualite : {objet.qualite}</Text>
          <Text style={{fontSize:16,fontWeight:'bold',}}>Quantite : {objet.quantite}</Text>
          <AntDesign name="checkcircle" size={50} color="#41aa08" onPress={() => deleteObjet(idObjet)} style={{top:-90,left:130,}}/>
          
           </View>
           <TouchableOpacity onPress={() => delet(idObjet)}  style={{top : 10,left:10,marginVertical:80, backgroundColor:"#41aa08", borderRadius:25, padding:10,paddingLeft:20,paddingRight:20, paddingRight:-50, right:10,marginHorizontal:130}}>
                  <Text style={{color:'#fff', fontWeight:'bold'}}>Supprimer</Text>
                </TouchableOpacity>
           </View>
        </>
      );
    }
    return null;
  };
  const deleteObjet = (idObjet) => {
    fetch(`http://10.0.2.2:8000/api/historiques/${idObjet}`, {
      method: 'DELETE'
    })
    fetch(`http://10.0.2.2:8000/api/vendres/${idObjet}`, {
      method: 'DELETE'
    })
    .then(() => {
      fetch(`http://10.0.2.2:8000/api/objets/${idObjet}`, {
        method: 'DELETE'
      })
      
      .then(() => {
        const updatedObjets = objets.filter(objet => objet.id !== idObjet);
        setObjets(updatedObjets);
        const updatedVendres = vendres.filter(vendre => vendre.idobjet !== idObjet);
        setVendres(updatedVendres);
      })
      .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  };
  const delet = (idObjet) => {
    fetch(`http://10.0.2.2:8000/api/historiques/${idObjet}`, {
      method: 'DELETE'
    })
    .then(() => {
      fetch(`http://10.0.2.2:8000/api/vendres/${idObjet}`, {
        method: 'DELETE'
      })
      
      .then(() => {
        const updatedObjets = objets.filter(objet => objet.id !== idObjet);
        setObjets(updatedObjets);
        const updatedVendres = vendres.filter(vendre => vendre.idobjet !== idObjet);
        setVendres(updatedVendres);
      })
      .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
       <ImageBackground  source={require('./assets/back3.png')}  style={styles.backgroundImage}>
      <Text style={styles.title}>Liste des personnes ayant acheté vos objets</Text>
      <FlatList
        data={vendres}
        keyExtractor={item => item.idobjet.toString()}
        style={{ width: '100%',marginHorizontal:0,marginVertical:10,top:30}}
           
        renderItem={({ item }) => {
          if (item.email === email) {
            return (
              <View  style={{backgroundColor:"#fff",borderRadius: 25,top:25,marginHorizontal:25, marginBottom:20, }}>
                {getObjetInfo(item.idobjet)}
                <View style={{left:10,top:-90,marginHorizontal:30,}}>
                <Text style={styles.infoText}>Nom de l'acheteur : {item.nom}</Text>
                <Text style={styles.infoText}>Adresse : {item.adresseun}, {item.adressedeux}, {item.codepostal}, {item.ville}, {item.pays}</Text>
                <Text style={styles.infoText}>Téléphone : {item.telephone}</Text>
                <Text style={styles.infoText}>Informations supplémentaires: {item.informations}</Text>
                <Text style={styles.infoText}>Mode de paiement : {item.modepaiement}</Text>
              
                </View>
              </View>
            );
          } else {
            return null;
          }
        }}
      />
      <Text >{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      </ImageBackground>
    </View>
  );
  
};





const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  backgroundImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 415,
    height: 630,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal:50,
    textAlign: 'center',
    top:20,
    color:"#fff",
  },
  infoText: {
    fontSize: 16,
    fontWeight:'bold',
  },
  image: {
    width: 160,
    height: 160,
    marginRight: 10,
    marginLeft: 10,
    top: 20,
    borderRadius: 50,
  },
});
export default Client;

