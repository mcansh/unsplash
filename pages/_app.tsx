import React from 'react';
import App from 'next/app';
import { LinkProvider } from '@mcansh/custom-next-link';

import Layout from '~/components/layout';

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <LinkProvider value="unsplash.mcan.sh">
          <Component {...pageProps} />
        </LinkProvider>
      </Layout>
    );
  }
}

export default MyApp;
