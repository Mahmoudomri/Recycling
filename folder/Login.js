import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Ajout de useNavigation
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation(); // Récupération de l'objet de navigation



  const API_URL = 'http://10.0.2.2:8000/api';
  const handleApiError = (error) => {
    console.error('API error', error);
    setError('Something went wrong');
  };
  

const handleLogin = async () => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password,
    });

    const token = response.data.access_token;

    if (response.status === 200) {
      if (email === 'admin@gmail.com' && password === 'adminadmin') {
        navigation.navigate('AdminInterface', { email: email });
      } else {
        navigation.navigate('MainTabScreen', { email: email});
      }
    } else {
      throw new Error(`API error [${response.status}]: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Error during login: [${error}]`);
    if (error.response) {
      console.error(`API error [${error.response.status}]: ${error.response.data.message}`);
    }
    handleApiError(error);
  }
};


const handleSignup = () => {
  navigation.navigate('Signup');
};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/back5.png')}
        style={styles.backgroundImage}>


      {error ? <Text style={{color:"red",top:65,left:130,}}>{error}</Text> : null}


      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="vpn-key" size={24} color="black" style={styles.icon} />
        <TextInput
             style={styles.input}
             placeholder="Mot de passe"
             onChangeText={setPassword}
             value={password}
             secureTextEntry={true}
        />
      </View>
    <TouchableOpacity style={styles.button} onPress={handleLogin}>
      <Text style={styles.buttonText}>Connexion</Text>
    </TouchableOpacity>


      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    width: '50%',
    alignItems: 'center',
    top:80,
    right:40,
    left:100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#68C238',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  buttonText2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    top:90,
    left:135,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 410,
    height: 610,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal:40,
    height:45,
    maxHeight:70,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 5,
    top:70,
    borderRadius: 18,
    backgroundColor: '#fff',
    opacity: 0.85,
    ...Platform.select({
      ios: {
        shadowColor: '#fff',
        shadowOffset: { width: 10, height: 20 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  icon: {
    marginRight: 10,
    color : '#68C238',
  },
  input: {
    flex: 1,
    fontSize:15,
  },
});

export default Login;

