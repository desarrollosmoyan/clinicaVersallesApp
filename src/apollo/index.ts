import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://f261-179-32-228-75.ngrok-free.app/graphql',
});

let token = '';
export const newToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      const jwt = JSON.parse(value);
      token = jwt.jwt;
    }
  } catch (e) {
    console.log('No se encontro el token');
  }
};

newToken();

const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
