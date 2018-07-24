import ApolloClient, { InMemoryCache } from 'apollo-boost';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    uri: 'http://localhost:4000',
    fetchOptions: {
      credentials: 'include',
    },
    request: async operation => {
      const token = getToken();
      operation.setContext({
        headers: {
          authorization: token || '',
        },
      });
    },
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
