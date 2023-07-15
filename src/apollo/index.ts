/* eslint-disable react-hooks/rules-of-hooks */
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'https://90b6-186-170-76-245.ngrok-free.app/graphql',
});

const newToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('token');
    return jsonValue != null ? JSON.parse(jsonValue) : '';
  } catch (e) {
    return '';
  }
};

console.log(newToken(), 'newToken');
const authLink = setContext((_, {headers}) => {
  const token = '';

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${newToken()}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
