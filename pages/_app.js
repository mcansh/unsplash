import React from 'react';
import App, { Container } from 'next/app';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/withData';

injectGlobal`
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
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: black;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: black;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 10rem;
    height: 100%;
    box-shadow: 0 0 1rem black, 0 0 0.5rem black;
    opacity: 1;
    transform: rotate(3deg) translate(0, -0.4rem);
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
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
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
