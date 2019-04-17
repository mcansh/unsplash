import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/withData';

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
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
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ThemeProvider theme={{ primary: 'black' }}>
          <>
            <GlobalStyle />
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
