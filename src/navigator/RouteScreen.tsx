import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import PedidosScreen from '../screen/PedidosScreen';
import DetallePedidoScreen from '../screen/DetallePedidoScreen';
import EscanerScreen from '../screen/EscanerScreen';
import WelcomeScreen from '../screen/WelcomeScreen';

export type RootStackParams = {
  Login: undefined;
  Wolcome: undefined;
  Pedidos: undefined;
  LecturaNFC: undefined;
  Detallepedido: {id: string};
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
        <Stack.Screen name="Wolcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Pedidos" component={PedidosScreen} />
        <Stack.Screen name="Detallepedido" component={DetallePedidoScreen} />
        <Stack.Screen name="LecturaNFC" component={EscanerScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RouteScreen;
