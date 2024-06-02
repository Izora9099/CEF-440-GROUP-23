import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StarterScreen from '../Screens/StarterScreen';
import IntroScreen from '../Screens/IntroScreen';
import ModeScreen from '../Screens/ModeScreen';

{/**admin screens */}
import LoginScreen from '../Screens/Admin/LoginScreen';
import SessionScreen from '../Screens/Admin/SessionScreen';
import StudentRegisterScreen from '../Screens/Admin/StudentRegisterScreen';


{/* student screens */}
import SessionSelectScreen from '../Screens/Student/SessionSelectScreen';
import TakeAttendanceScreen from '../Screens/Student/TakeAttendanceScreen';




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
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        <Stack.Screen name="StudentRegisterScreen" component={StudentRegisterScreen} />



        {/**student screens */}
        <Stack.Screen name="SessionSelectScreen" component={SessionSelectScreen} />
        <Stack.Screen name="TakeAttendanceScreen" component={TakeAttendanceScreen} />
        


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
