import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ImageBackground, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function Signup() {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [type, setType] = useState('');
  const [tel, setTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [daten, setDaten] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSignup = async () => {
    try {
      const response = await fetch('http://10.0.2.2:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          prenom,
          type,
          tel,
          adresse,
          daten,
          email,
          password,
          password_confirmation: confirmPassword
        })
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        throw new Error(json.errors ? Object.values(json.errors)[0][0] : 'Signup failed');
      }
  
      console.log(json.message);
      Alert.alert(
        'Success',
        'Utilisateur enregistré avec succès',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK pressed'),
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => console.log('Alert dismissed'),
          titleStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#68C238',
            textAlign: 'center',
            marginBottom: 16,
          },
          messageStyle: {
            fontSize: 16,
            color: '#333',
            textAlign: 'center',
            lineHeight: 24,
            paddingHorizontal: 24,
            marginBottom: 24,
          },
          overlayStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          containerStyle: {
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 24,
            marginHorizontal: 32,
          },
        }
      );
      
      
    } catch (err) {
      setError(err.message);
    }
  };
  



 
  const setTypeVendeur = () => {
    setType('Vendeur');
  };

  const setTypeAcheteur = () => {
    setType('Acheteur');
   
  };
  
   


  return (
     
    <View style={styles.container}>
      <ScrollView style={{ width:'100%',top:0,}}>
      <ImageBackground
        source={require('./assets/signup.png')}
        style={styles.backgroundImage}>
         
<View style={{top:5,}}>
      <Text style={{color:"red",top:90,justifyContent: 'center', alignItems: 'center',left : 50,}}>{error}</Text>
<View style={{top:-400,}}>
 <View style={styles.inputContainer}>
        <MaterialIcons name="drive-file-rename-outline" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Types"
        value={type}
        onChangeText={setType}
      />
      </View></View>
      <View style={{top:-40,}}>
      <View style={styles.inputContainer}>
        <MaterialIcons name="drive-file-rename-outline" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
      </View>


      <View style={styles.inputContainer}>
        <MaterialIcons name="drive-file-rename-outline" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />
      </View>
 



      
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      </View>



      <View style={styles.inputContainer}>
        <Foundation name="telephone" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Telephone"
        value={tel}
        onChangeText={setTel}
        keyboardType="Telephone"
        autoCapitalize="none"
      />
      </View>


      <View style={styles.inputContainer}>
        <FontAwesome name="map-marker" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Adresse"
        value={adresse}
        onChangeText={setAdresse}
        keyboardType="Adresse"
        autoCapitalize="none"
      />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="date-range" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Date de naissance"
        value={daten}
        onChangeText={setDaten}
        keyboardType="Datenaissance"
        autoCapitalize="none"
      />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="vpn-key" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="vpn-key" size={24} color="black" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      </View>


<View style={{top:90,left:125}}>
      <View style={styles.buttonContainerr}>
        <TouchableOpacity
          style={[styles.buttonn, type === 'Vendeur' && styles.activeButtonn]}
          onPress={setTypeVendeur}
          activeOpacity={type === 'Vendeur' ? 1 : 0.2}
        >
          <Text style={styles.buttonTextt}>Vendeur</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonn, type === 'Acheteur' && styles.activeButtonn]}
          onPress={setTypeAcheteur}
          activeOpacity={type === 'Acheteur' ? 1 : 0.2}
        >
          <Text style={styles.buttonTextt}>Acheteur</Text>
        </TouchableOpacity>
      </View>
</View>
    <TouchableOpacity style={styles.button} onPress={handleSignup}>
      <Text style={styles.buttonText}>Connexion</Text>
    </TouchableOpacity>
    </View>
    </View>  
      </ImageBackground>  
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:700,
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
  
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 410,
    height: 900,
  
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
  },
  icon: {
    marginRight: 10,
    color : '#68C238',
  },
  input: {
    flex: 1,
    fontSize:15,
  },


  
  buttonContainerr: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonn: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  
    backgroundColor: '#e7756f', 
  },
  buttonTextt: {
    color: '#fff',
    textAlign: 'center',
  },
  activeButtonn: {
    backgroundColor: '#4CAF50',
    borderWidth: 0,
    borderColor: '#4CAF50',
  },
});

