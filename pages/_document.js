import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { description } from '../package.json';
import { twitter } from '../utils/helpers';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
    };
  }

  render() {
    const { styleTags } = this.props;

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover, minimum-scale=1, maximum-scale=1"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000" />
          <meta name="description" content={description} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={twitter} />
          <meta name="twitter:title" content="Unsplash Instant" />
          <meta name="twitter:description" content={description} />
          {styleTags}
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
