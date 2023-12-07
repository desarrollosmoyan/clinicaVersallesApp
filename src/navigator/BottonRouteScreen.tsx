import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from '../constants/color';
import {RouteSecondary} from './RouteSecondary';
import PerfilScreen from '../screen/private/PerfilScreen';

export type RootStackParams = {
  Perfil: undefined;
  Inicio: undefined;
};

const Tab = createBottomTabNavigator();

function BottonRouteScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 12,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          borderBottomColor: COLORS.primary,
          borderBottomWidth: 1,
          borderTopWidth: 1,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarActiveBackgroundColor: COLORS.primary,
      }}>
      <Tab.Screen
        name="Inicio"
        component={RouteSecondary}
        options={{
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.primary,
          tabBarIcon: ({focused}) => (
            <Icon
              name="home-outline"
              size={20}
              color={focused ? COLORS.white : COLORS.primary}
              style={{marginTop: 10}}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarActiveTintColor: COLORS.white,
          tabBarInactiveTintColor: COLORS.primary,

          tabBarIcon: ({focused}) => (
            <Icon
              name="person-outline"
              size={20}
              color={focused ? COLORS.white : COLORS.primary}
              style={{marginTop: 10}}
            />
          ),
        }}
        name="Perfil"
        component={PerfilScreen}
      />
    </Tab.Navigator>
  );
}

export default BottonRouteScreen;
