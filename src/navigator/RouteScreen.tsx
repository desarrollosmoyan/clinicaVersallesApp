import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/public/LoginScreen';
import WelcomeScreen from '../screen/public/WelcomeScreen';
import BottonRouteScreen from './BottonRouteScreen';

import {useAuthStore} from '../store/auth';
import SplashScreen from '../screen/SplashScreen';

export type RootStackParams = {
  Login: undefined;
  Wolcome: undefined;
  InicioBottom: undefined;
  // Splash: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RouteScreen = () => {
  // DATA DE AUTENTICACION
  const dataAuth = useAuthStore(state => state.dataAuth);

  if (dataAuth.isLoading) {
    // SPLASH SCREEN
    return <SplashScreen />;
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        {dataAuth.isSignout ? (
          <Stack.Screen name="InicioBottom" component={BottonRouteScreen} />
        ) : (
          <>
            <Stack.Screen name="Wolcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default RouteScreen;
