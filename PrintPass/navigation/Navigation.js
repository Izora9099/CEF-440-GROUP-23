import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StarterScreen from '../Screens/StarterScreen';
import IntroScreen from '../Screens/IntroScreen';
import ModeScreen from '../Screens/ModeScreen';
import LoginScreen from '../Screens/Admin/LoginScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StarterScreen" component={StarterScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="ModeScreen" component={ModeScreen} />
        {/****admin screens */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />


        {/**student screens */}



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
