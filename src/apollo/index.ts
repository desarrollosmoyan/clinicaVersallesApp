import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {getToken} from '../utils/getToken';

import ENV from '../enviroment';

const httpLink = createHttpLink({
  uri: ENV.URL + '/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await getToken();
  console.log('token', token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.jwt}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
