import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

import App from '../../ui';

const DEVELOPMENT_URI = 'localhost:4000';

const wsClient = new WebSocketLink({
  uri: `ws://${DEVELOPMENT_URI}/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: {
      token: '',
    },
  },
});

const httpClient = new HttpLink({ uri: `https://${DEVELOPMENT_URI}/graphql` });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsClient,
  httpClient
);

// Cache
const cache = new InMemoryCache();

// Client
const client = new ApolloClient({
  link,
  cache,
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
