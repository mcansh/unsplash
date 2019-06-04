import React from 'react';
import Head from 'next/head';
import { getInitialState } from 'graphql-hooks-ssr';
import initGraphQL from './init-graphql';
import getHost from '~/utils/get-host';

export default App => {
  return class GraphQLHooks extends React.Component {
    static displayName = 'GraphQLHooks(App)';

    static async getInitialProps(appContext) {
      const {
        Component,
        router,
        ctx: { req },
      } = appContext;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      const host = getHost(req);

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const graphQLClient = initGraphQL(undefined, host);
      let graphQLState = {};
      // @ts-ignore
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          graphQLState = await getInitialState({
            // @ts-ignore
            App: (
              <App
                {...appProps}
                Component={Component}
                router={router}
                graphQLClient={graphQLClient}
              />
            ),
            client: graphQLClient,
            host,
          });
        } catch (error) {
          // Prevent GraphQL hooks client errors from crashing SSR.
          // Handle them in components via the state.error prop:
          // https://github.com/nearform/graphql-hooks#usequery
          console.error('Error while running `getInitialState`', error);
        }

        // getInitialState does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      return {
        ...appProps,
        graphQLState,
      };
    }

    graphQLClient = null;

    constructor(props) {
      super(props);
      // eslint-disable-next-line react/prop-types
      this.graphQLClient = initGraphQL(props.graphQLState, props.host);
    }

    render() {
      return <App {...this.props} graphQLClient={this.graphQLClient} />;
    }
  };
};
