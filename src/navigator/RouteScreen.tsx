import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import PedidosScreen from '../screen/PedidosScreen';

const Stack = createStackNavigator();

const RouteScreen = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Pedidos" component={PedidosScreen} />
      </Stack.Navigator>
    </>
  );
};

export default RouteScreen;
