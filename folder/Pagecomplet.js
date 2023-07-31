import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserInterface from './UserInterface';
import MainTabScreen from './Test';

const Stack = createStackNavigator();
export default function Pagecomplet() {
  return (
    <View style={styles.container}>
     <UserInterface/>
     <NavigationContainer >
     <MainTabScreen/>
     </NavigationContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//<Text >{'\n'}{'\n'}{'\n'}{'\n'}</Text>