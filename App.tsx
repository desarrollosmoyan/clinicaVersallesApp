import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RouteScreen from './src/navigator/RouteScreen';
import {ThemeProvider} from '@rneui/themed';
import {theme} from './src/theme';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo';

import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <RouteScreen />
            <Toast />
          </NavigationContainer>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
