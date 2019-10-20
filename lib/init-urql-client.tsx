import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
} from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import 'isomorphic-unfetch';

let urqlClient: any = null;
let ssrCache: any = null;

function initUrqlClient(initialState?: any) {
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however
  const isServer = typeof window === 'undefined';
  if (isServer || !urqlClient) {
    ssrCache = ssrExchange({ initialState });

    urqlClient = createClient({
      url: 'http://localhost:3000/api/graphql',
      // Active suspense mode on the server-side
      suspense: isServer,
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange,
        ssrCache,
        fetchExchange,
      ],
    });
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache];
}

export { initUrqlClient };
