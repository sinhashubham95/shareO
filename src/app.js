import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import SplashScreen from 'react-native-smart-splash-screen';
import AppContainer from './navigator';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    new HttpLink({
      uri: 'http://shareo-app-server.centralus.cloudapp.azure.com:8080/graphql',
      credentials: 'same-origin'
    }),
  ]),
  cache: new InMemoryCache(),
});

export default class App extends Component {
  componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
   });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer
          uriPrefix="/app"
        />
      </ApolloProvider>
    );
  }
}
