import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import RouteScreen from './src/navigator/RouteScreen';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo';
import {theme} from './src/theme';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const navigation = useNavigation();
  const iniciarSession = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log('hay token');
        navigation.navigate('InicioBottom' as never);
      } else {
        console.log('no hay token');
        navigation.navigate('Wolcome' as never);
      }
    } catch (e) {
      console.log('no hay token');
      navigation.navigate('Wolcome' as never);
    }
  };
  useEffect(() => {
    iniciarSession();
  }, []);
  return (
    <>
      <ApolloProvider client={client}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <RouteScreen />
            <Toast />
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
