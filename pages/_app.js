import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ClientContext } from 'graphql-hooks';
import withGraphQLClient from '../lib/with-graphql-client';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
    margin: 0;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    background: white;
    line-height: 1.15;
  }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps, graphQLClient } = this.props;

    return (
      <Container>
        <ThemeProvider theme={{ primary: 'black' }}>
          <ClientContext.Provider value={graphQLClient}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </ClientContext.Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withGraphQLClient(MyApp);
