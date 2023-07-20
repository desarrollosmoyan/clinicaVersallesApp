import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import BottonRouteScreen from './BottonRouteScreen';

import SplashScreen from '../screen/SplashScreen';

export type RootStackParams = {
  Login: undefined;
  Wolcome: undefined;
  InicioBottom: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RouteScreen = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Wolcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="InicioBottom" component={BottonRouteScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RouteScreen;
