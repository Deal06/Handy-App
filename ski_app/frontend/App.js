import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodoProvider } from './context/TodoContext';

import TrickToDo from './screens/TrickToDo';
import Challenge from './screens/Challenge';
import ChallengeSettings from './screens/ChallengeSettings';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name = "TrickToDo" component={TrickToDo}/>
        <Stack.Screen name = "Challenge" component={Challenge}/>
        <Stack.Screen name = "ChallengeSettings" component={ChallengeSettings}/>
      </Stack.Navigator>

      <StatusBar style = "auto"/>
    </NavigationContainer>
    </TodoProvider>
  );
}
