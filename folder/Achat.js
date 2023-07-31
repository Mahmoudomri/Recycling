import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,ImageBackground,TouchableOpacity,Alert} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect,useState  } from 'react';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ConversationsList from './ConversationsList';
import { Ionicons } from '@expo/vector-icons';
const Stack = createStackNavigator();
export default function Achat({ route,navigation }) {
    const { title } = route.params || {};
    const { image } = route.params || {};
    const { quantite } = route.params || {};
    const qn=quantite;
    const { qualite } = route.params || {};
    const qu=qualite;
    const { prix } = route.params || {};
    const { description } = route.params || {};
    const { email } = route.params || {};
    const { Emaildeux } = route.params || {};
    const Gmaildeux = Emaildeux;
    const { id } = route.params || {};
    const idobjet = id;
    const gmail =email;
    const [favori, setFavori] = useState(false);
    const [favories, setFavories] = useState([]);
    useEffect(() => {
      async function fetchFavorie() {
        try {
          const response = await axios.get('http://10.0.2.2:8000/api/favories');
          setFavories(response.data);
          const isInFavorites = response.data.some(f => f.email === email && f.quantite === quantite && f.qualite === qualite);
          setFavori(isInFavorites);
        } catch (error) {
          console.error(error);
        }
      }
      console.log(email);
      fetchFavorie();
    }, []);


  


      const enregistrerFavori = async () => {
        const data = {
        email: email,
        quantite: quantite,
        qualite: qualite,
        };
        try {
        const response = await axios.post(
        'http://10.0.2.2:8000/api/favories',
        data
        );
        console.log(response.data);
        } catch (error) {
        console.error(error);
        }
        };
     
        const supprimerFavori = async (email, quantite, qualite) => {
          try {
            const response = await axios.delete('http://10.0.2.2:8000/api/favories', {
              data: {
                email: email,
                quantite: quantite,
                qualite: qualite,
              },
            });
            setFavori(false);
          
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Une erreur s\'est produite lors de la suppression de l\'élément de l\'historique.');
          }
        };
        

  return (
    <View style={styles.container}>
          <ImageBackground  source={require('./assets/back3.png')}  style={styles.backgroundImage}>



          <Text >{'\n'}{'\n'}</Text>
<View  style={{ backgroundColor:'#fff',borderRadius:20, height:450,marginHorizontal:40,left:-5,top:0,}} >

<TouchableOpacity onPress={() => {
            if (favori) {
              setFavori(false);
              supprimerFavori(email,quantite,qualite);
            } else {
              setFavori(true);
              enregistrerFavori();
            }
          }}>
<Ionicons name="heart" 
    size={40}
    color={favori ? 'red' : '#0017'}
    style={{ position: 'absolute', top: 290, right: 35 }}
  />
</TouchableOpacity>

        {image && (
            <Image
              source={{ uri: `http://10.0.2.2:8000/storage/${image}` }}
              style={{ width: 260, height: 260, marginRight: 80, marginLeft: 40,top:20,  borderRadius: 15,}}
            />
          )}
          <View style={{left:20,top:50,}} >
          <Text style={{fontSize:18,fontWeight:'bold'}}>{ quantite }</Text>
        <Text style={{fontSize:14,}}> Qualité : { qualite }</Text>
        <Text style={{fontSize:28, left : 185,fontWeight:'bold', top: 45,}}> { prix }</Text>
        <Text style={{marginHorizontal:70,left:-70,fontWeight:'bold',top: -30,fontSize:12.5,color:'#0017'}}>{ description }</Text>
            </View>          
          </View>
      
          <TouchableOpacity style={styles.b} onPress={() => {
 
  navigation.navigate('Vendre', { id:idobjet, emaill:gmail,Emaildeux:Gmaildeux, qualite:qu, quantite:qn,});
}}>
  <Text style={styles.buttonText}>J'ACHETE</Text>
</TouchableOpacity>

<TouchableOpacity 
 onPress={() => {
 
  navigation.navigate('Chat', { emaill:gmail,id:idobjet,Emaildeux:Gmaildeux,});
}}
>
<Ionicons name="chatbubbles" size={40} color="black" style={{ marginRight: 10, bottom:170,left:300, }} />
              </TouchableOpacity>

           </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    
      
    },
    tx: {
      top:-20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      fontSize:30,
    },
    backgroundImage: {
      resizeMode: 'cover',
      justifyContent: 'center',
      width: 420,
     height: 610,
    
      
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        
      },
    b:{
        backgroundColor: '#fff', 
        padding: 10,
        width: '50%',
        alignItems: 'center',
        top:0,
        right:40,
        left:100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        borderRadius: 25,
      },
    list:{
  top:-80,
  left:50,
  height:'100%',
  width:'100%',
    },
    categoryContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 8,
      height: 200,
    },
    categoryImage: {
      width: '100%',
      height: '80%',
      resizeMode: 'contain',
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 8,
    },
    tx0: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize:20,
      color: '#fff',
    },
  });
  
  /*   */