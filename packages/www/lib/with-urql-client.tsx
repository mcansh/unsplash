import React from 'react';
import { Client } from 'urql';
// @ts-ignore
import ssrPrepass from 'react-ssr-prepass';
import { AppContext } from 'next/app';
import getHost from '../utils/get-host';
import initUrqlClient from './init-urql-client';

const withUrqlClient = (App: any) => {
  return class WithUrql extends React.Component {
    static async getInitialProps(appContext: AppContext) {
      const {
        Component,
        router,
        ctx: { req },
      } = appContext;

      // Run the wrapped component's getInitialProps function
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      // getInitialProps is universal, but we only want
      // to run server-side rendered suspense on the server
      if (!req) {
        return appProps;
      }

      const host = `${getHost(req)}/graphql`;

      const [urqlClient, ssrCache] = initUrqlClient(undefined, host);

      // Run suspense and hence all urql queries
      await ssrPrepass(
        <App
          {...appProps}
          Component={Component}
          router={router}
          urqlClient={urqlClient}
        />
      );

      // Extract query data from the Apollo store
      // Extract the SSR query data from urql's SSR cache
      const urqlState = ssrCache.extractData();

      return {
        ...appProps,
        urqlState,
        host,
      };
    }

    urqlClient: Client | null = null;

    constructor(
      props: AppContext & { host: string; urqlState: any; urqlClient: Client }
    ) {
      super(props);
      if (props.urqlClient) {
        this.urqlClient = props.urqlClient;
      } else {
        console.log(props.host);

        // Create the urql client and rehydrate the prefetched data
        const [urqlClient] = initUrqlClient(props.urqlState, props.host);
        this.urqlClient = urqlClient;
      }
    }

    render() {
      return <App {...this.props} urqlClient={this.urqlClient} />;
    }
  };
};

export default withUrqlClient;
