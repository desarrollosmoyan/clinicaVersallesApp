import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
// import PedidosScreen from '../screen/PedidosScreen';
// import DetallePedidoScreen from '../screen/DetallePedidoScreen';
// import EscanerScreen from '../screen/EscanerScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import BottonRouteScreen from './BottonRouteScreen';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screen/SplashScreen';

export type RootStackParams = {
  Login: undefined;
  Wolcome: undefined;
  InicioBottom: undefined;
  Splash: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RouteScreen = () => {
  const navigation = useNavigation();
  const iniciarSession = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log('hay token');
        navigation.navigate('InicioBottom' as never);
      } else {
        console.log('no hay token');
        navigation.navigate('Splash' as never);
      }
    } catch (e) {
      console.log('no hay token');
      navigation.navigate('Splash' as never);
    }
  };
  useEffect(() => {
    iniciarSession();
  }, []);
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
