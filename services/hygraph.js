import { ApolloClient, InMemoryCache } from '@apollo/client';

export const hygraph = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_HYGRAPH_URI,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`,
  },
});
