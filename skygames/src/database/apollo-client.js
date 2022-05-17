import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(createClient({
    url: 'wss://sky-games.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        "x-hasura-admin-secret" : "CQhJ12DBZVjiHWx137CJh7og8vqrhwMWlYZHWke864UcQkqKXYb6RuOg22MIVEZc"
      }
    }
  }));

const httpLink = new HttpLink({
  uri: "https://sky-games.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "CQhJ12DBZVjiHWx137CJh7og8vqrhwMWlYZHWke864UcQkqKXYb6RuOg22MIVEZc",
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
    link : splitLink,
    cache: new InMemoryCache(),
});

export default client;