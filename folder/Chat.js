import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat, Bubble,InputToolbar,Send } from 'react-native-gifted-chat';
import { FontAwesome } from '@expo/vector-icons';
const Chat = ({ route, navigation }) => {
  const { emaill } = route.params || {};
  const { id } = route.params || {};
  const { Emaildeux } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const startNewConversation = () => {
    navigation.navigate('ConversationsList');
  };

  useEffect(() => {
    // Load messages from the server
    const loadMessages = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8000/api/chats?recipient_email=${Emaildeux}&sender_email=${emaill}`);
        const data = await response.json();
        setMessages(
          data
            .filter(message => message.produit === id.toString())
            .map(message => ({
              _id: message.id,
              text: message.body,
              createdAt: message.created_at,
              user: {
                _id: message.sender_email === emaill ? 1 : 2,
                name: message.sender_email === emaill ? 'You' : 'Other',
                avatar: message.sender_email === emaill ? ' ' : ' ',
              },
            })).reverse() // Reverse the order of the messages
        );
        
      } catch (error) {
        console.log(error);
        setErrorMessage('Failed to load messages');
      }
    };

    loadMessages();
    console.log(id);
    console.log(emaill);
    console.log(Emaildeux);
  }, [emaill, Emaildeux]);

  const onSend = useCallback((newMessages = []) => {
    // Send new messages to the server
    const sendMessage = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8000/api/chats', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: newMessages[0].text,
            sender_email: emaill,
            recipient_email: Emaildeux,
            produit: id,
          }),
        });
        const data = await response.json();
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages).reverse()); // Reverse the order of the messages
      } catch (error) {
        console.log(error);
        setErrorMessage('Failed to send message');
      }
    };
    sendMessage();
  }, [emaill, Emaildeux]);



  return (
    <View style={styles.container}>
<View >
<Text style={{fontSize:23, textAlign: 'center',alignSelf: 'center',padding:10,fontWeight:'bold' }}>Discutez, posez vos questions, partagez vos avis sur notre produit.</Text>
        </View>

      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <GiftedChat
  messages={messages}
  onSend={messages => onSend(messages)}
  user={{
    _id: 1,
  }}
  // Example of customizing the chat bubble color and background color
  // You can add more styles to the object as needed
  renderBubble={(props) => {
    return (
      <View >
     
     <Bubble
  {...props}
  wrapperStyle={{
    left: {
      backgroundColor: '#c6f7ab',
      borderRadius: 15,
      padding: 0,
      marginRight: 60,
      maxWidth: '80%',
      bottom:30,
    },
    right: {
      backgroundColor: '#68C239',
      borderRadius: 15,
      padding: 0,
      marginLeft: 60,
      maxWidth: '80%',
      bottom:30,
    },
  }}
  textStyle={{
    left: {
      color: '#000',
    },
    right: {
      color: '#fff',
    },
  }}
/>

     
      </View>
    );
  }}
  renderInputToolbar={(props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#e2fcd4',
        borderTopWidth: 0,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 15,
        marginHorizontal:20,
        bottom:15,
      }}
      renderSend={(props) => (
        <Send {...props}>
          <FontAwesome name="send" size={26} color="#000" style={{top:0,left:-10,}} />
        </Send>
      )}
    />
  )}
  
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
   
  },
});

export default Chat;









/*import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Pusher from 'pusher-js/react-native';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [receiverId, setReceiverId] = useState('');

  useEffect(() => {
    // Initialiser Pusher avec les informations d'authentification
    const pusher = new Pusher('<PUSHER_APP_KEY>', {
      authEndpoint: 'http://<APP_URL>/broadcasting/auth',
      cluster: '<PUSHER_APP_CLUSTER>',
    });

    // Souscrire au canal "chat-channel"
    const channel = pusher.subscribe('chat-channel');

    // Écouter les événements "chat-event" du canal
    channel.bind('chat-event', function (data) {
      // Ajouter le nouveau message à la liste des messages
      setMessages(prevMessages => [data.message, ...prevMessages]);
    });

    return () => {
      // Se désabonner du canal Pusher lorsqu'on quitte l'application
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const sendMessage = () => {
    // Envoyer le message au serveur
    axios.post('http://<APP_URL>/api/messages', {
      receiver_id: receiverId,
      content: input,
    });

    // Effacer le champ de saisie
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.messages}>
        {messages.map(message => (
          <View key={message.id} style={styles.message}>
            <Text style={styles.sender}>{message.sender.name}:</Text>
            <Text style={styles.content}>{message.content}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Message"
          placeholderTextColor="#b2b2b2"
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messages: {
    flex: 1,
    padding: 10,
  },
  message: {
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  content: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 10,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0084ff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chat;*/
