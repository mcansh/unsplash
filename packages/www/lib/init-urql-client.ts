import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  Client,
} from 'urql';
import 'isomorphic-unfetch';

let urqlClient: Client | null = null;
let ssrCache: any = null;

export default function initUrqlClient(initialState: any, url: string) {
  const isServer = typeof window === 'undefined';
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however
  if (isServer || !urqlClient) {
    ssrCache = ssrExchange({ initialState });

    urqlClient = createClient({
      url,
      // Active suspense mode on the server-side
      suspense: isServer,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    });
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache];
}
