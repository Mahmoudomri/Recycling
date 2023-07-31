import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Chat from './Chat';

const ConversationsList = ({ navigation, route }) => {

  const [messages, setMessages] = useState([]);
  const { emaill } = route.params || {};
  const { id } = route.params || {};
  const { Emaildeux } = route.params || {};
  const gmaildeux = Emaildeux;
  const gmail = emaill;
  const Id = id;

  useEffect(() => {
    // Load messages from the server
    const loadMessages = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8000/api/chats?recipient_email=${emaill}&produit=${Id}`);
        const data = await response.json();
        // Filter out duplicate sender emails
        const filteredData = data.filter((item, index, self) =>
          index === self.findIndex((t) => t.sender_email === item.sender_email)
        );
        setMessages(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    loadMessages();
    console.log(emaill);
    console.log(Emaildeux);
    console.log(id);
  }, [emaill, id,Emaildeux]);

  const startConversation = (recipient_email) => {
    navigation.navigate('Chat', { Emaildeux: gmaildeux, emaill: gmail, id: Id });
  };

return (
    <View style={styles.container}>
      {messages.length > 0 ? (
        messages.map((message, index) => {
          // Vérifier si l'email de l'utilisateur est égal à l'email du message
          if (message.sender_email === gmail) {
            return null; // Ne pas afficher l'email de l'utilisateur
          }
          // Vérifier si l'email est déjà dans la liste
          const foundIndex = messages.findIndex(
            (item) => item.sender_email === message.sender_email
          );
          if (foundIndex !== index) {
            return null; // Ne pas afficher l'email en double
          }
          
          // Afficher l'email
          if (message.produit !== Id) {
            return (
                <View key={message.id}>
                  <TouchableOpacity onPress={() =>  navigation.navigate('Chat', { Emaildeux: gmaildeux, emaill: gmail, id: Id })}>
                    <Text>{message.sender_email}</Text>
                  </TouchableOpacity>
                </View>
              );
          }
         
        })
      ) : (
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Chat', { Emaildeux: gmaildeux, emaill: emaill, id: id })}>
            <Text>Messages</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ConversationsList;
