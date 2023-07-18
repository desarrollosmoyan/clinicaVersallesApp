import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import PerfilScreen from '../screen/PerfilScreen';
import COLORS from '../constants/color';
import {RouteSecondary} from './RouteSecondary';

export type RootStackParams = {
  Perfil: undefined;
  Inicio: undefined;
};

// const Stack = createStackNavigator<RootStackParams>();

const Tab = createMaterialBottomTabNavigator<RootStackParams>();

function BottonRouteScreen() {
  return (
    <Tab.Navigator barStyle={{backgroundColor: '#06105D'}}>
      <Tab.Screen
        name="Inicio"
        component={RouteSecondary}
        options={{
          tabBarIcon: () => (
            <Icon name="home-outline" size={30} color={COLORS.white} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: () => (
            <Icon name="person-outline" size={30} color={COLORS.white} />
          ),
        }}
        name="Perfil"
        component={PerfilScreen}
      />
    </Tab.Navigator>
  );
}

export default BottonRouteScreen;
