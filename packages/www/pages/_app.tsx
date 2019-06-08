import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Provider, Client } from 'urql';
import withUrqlClient from '../lib/with-urql-client';

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

class MyApp extends App<{ urqlClient: Client }> {
  render() {
    const { Component, pageProps, urqlClient } = this.props;

    return (
      <Container>
        <ThemeProvider theme={{ primary: 'black' }}>
          <Provider value={urqlClient}>
            <>
              <GlobalStyle />
              <Component {...pageProps} />
            </>
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withUrqlClient(MyApp);
