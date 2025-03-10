import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // Ensure this matches your backend GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
