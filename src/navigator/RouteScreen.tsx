import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/public/LoginScreen';
import WelcomeScreen from '../screen/public/WelcomeScreen';
import BottonRouteScreen from './BottonRouteScreen';

import {useAuthStore} from '../store/auth';
import SplashScreen from '../screen/SplashScreen';
import useAuth from '@/hooks/useAuth';

export type RootStackParams = {
  Login: undefined;
  Wolcome: undefined;
  InicioBottom: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RouteScreen = () => {
  // HOOK QUE VERIFICA SE O USUÁRIO ESTÁ LOGADO
  useAuth();

  // DATA DE AUTENTICACION
  const {isAuth, isLoading} = useAuthStore(state => ({
    isAuth: state.isAuth,
    isLoading: state.isLoading,
  }));

  if (isLoading) {
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
        {isAuth ? (
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
