import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import unfetch from 'isomorphic-unfetch';

let graphQLClient = null;

function create(initialState = {}, host: string) {
  const url = process.env.NOW
    ? `${host}/graphql`
    : 'http://localhost:3000/graphql';

  return new GraphQLClient({
    // @ts-ignore
    ssrMode: !process.browser,
    url,
    cache: memCache({ initialState }),
    // @ts-ignore
    fetch: process.browser ? fetch.bind() : unfetch,
  });
}

export default function initGraphQL(initialState: any, host: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  // @ts-ignore
  if (!process.browser) {
    return create(initialState, host);
  }

  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(initialState, host);
  }

  return graphQLClient;
}
