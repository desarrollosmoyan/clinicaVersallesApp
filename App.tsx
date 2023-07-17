import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RouteScreen from './src/navigator/RouteScreen';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo';
import {theme} from './src/theme';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';

const App = () => {
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
