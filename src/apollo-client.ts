import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";

const wsLink = new WebSocketLink({
  uri: `ws://planning-poker678.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-access-key": process.env.REACT_APP_GRAPHQL_API_KEY,
      },
    },
  },
});

export const createApolloClient = () => {
  return new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
};
