import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import PerfilScreen from '../screen/PerfilScreen';
import COLORS from '../constants/color';
import {RouteSecondary} from './RouteSecondary';

export type RootStackParams = {
  Perfil: undefined;
  Inicio: undefined;
};

// const Stack = createStackNavigator<RootStackParams>();

const Tab = createBottomTabNavigator();

function BottonRouteScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 12,
          // color: COLORS.primary,
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
