import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DocumentPicker from 'react-native-document-picker';

export default function Supprimer() {
    const Stack = createStackNavigator();
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});