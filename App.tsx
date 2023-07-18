import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RouteScreen from './src/navigator/RouteScreen';
import {ApolloProvider} from '@apollo/client';
import client from './src/apollo';
import {theme} from './src/theme';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {useSessionStore} from './src/store/session';
import {getToken} from './src/utils/getToken';

const App = () => {
  const sessionUpdate = useSessionStore(state => state.sessionUpdate);

  useEffect(() => {
    const session = async () => {
      const value = await getToken();
      sessionUpdate(value!);
    };

    session();
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
