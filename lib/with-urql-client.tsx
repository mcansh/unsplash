import React from 'react';
import { Provider, Client } from 'urql';
import ssrPrepass from 'react-ssr-prepass';
import { NextPageContext } from 'next';

import { initUrqlClient } from './init-urql-client';

interface Props {
  urqlClient: Client;
  urqlState: any;
}

const withUrqlClient = (App: any) => {
  const WithUrql = (props: Props) => {
    const urqlClient: Client = React.useMemo(
      () => props.urqlClient || initUrqlClient(props.urqlState)[0],
      [props.urqlClient, props.urqlState]
    );

    return (
      <Provider value={urqlClient}>
        <App {...props} urqlClient={urqlClient} />
      </Provider>
    );
  };

  WithUrql.getInitialProps = async (ctx: NextPageContext) => {
    const { AppTree } = ctx;
    // Run the wrapped component's getInitialProps function
    let appProps = {};
    if (App.getInitialProps) appProps = await App.getInitialProps(ctx);

    // getInitialProps is universal, but we only want
    // to run server-side rendered suspense on the server
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) return appProps;

    const [urqlClient, ssrCache] = initUrqlClient();

    // Run suspense and hence all urql queries
    await ssrPrepass(
      <AppTree
        pageProps={{
          ...appProps,
          urqlClient,
        }}
      />
    );

    // Extract query data from the urql store
    // Extract the SSR query data from urql's SSR cache
    const urqlState = ssrCache.extractData();

    return {
      ...appProps,
      urqlState,
    };
  };

  return WithUrql;
};

export default withUrqlClient;
