import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
// import PedidosScreen from '../screen/PedidosScreen';
// import DetallePedidoScreen from '../screen/DetallePedidoScreen';
// import EscanerScreen from '../screen/EscanerScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import BottonRouteScreen from './BottonRouteScreen';

export type RootStackParams = {
  Login: undefined;
  Wolcome: undefined;
  InicioBottom: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const RouteScreen = () => {
  // navigation.navigate('InicioBottom' as never);
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
        <Stack.Screen name="InicioBottom" component={BottonRouteScreen} />
        {/* <Stack.Screen name="Pedidos" component={PedidosScreen} />
        <Stack.Screen name="Detallepedido" component={DetallePedidoScreen} />
        <Stack.Screen name="LecturaNFC" component={EscanerScreen} /> */}
      </Stack.Navigator>
    </>
  );
};

export default RouteScreen;
