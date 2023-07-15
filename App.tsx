import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RouteScreen from './src/navigator/RouteScreen';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo';

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <RouteScreen />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
};

export default App;
