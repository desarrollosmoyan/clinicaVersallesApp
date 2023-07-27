import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PedidosScreen from '../screen/PedidosScreen';
import DetallePedidoScreen from '../screen/DetallePedidoScreen';
import EscanerScreen from '../screen/EscanerScreen';

export type RootStackParamsSecondary = {
  Pedidos: undefined;
  LecturaNFC: {id: string};
  Detallepedido: {id: string};
};

const Stack = createStackNavigator<RootStackParamsSecondary>();

export const RouteSecondary = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Stack.Screen name="Pedidos" component={PedidosScreen} />
        <Stack.Screen name="Detallepedido" component={DetallePedidoScreen} />
        <Stack.Screen name="LecturaNFC" component={EscanerScreen} />
      </Stack.Navigator>
    </>
  );
};
