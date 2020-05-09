import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";

const wsLink = new WebSocketLink({
  uri: `ws://planning-poker678.herokuapp.com/v1/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "X-Hasura-Role": "anonymous",
      },
    },
  },
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

export const createApolloClient = () => {
  return new ApolloClient({
    link: wsLink,
    cache: new InMemoryCache(),
  });
};
