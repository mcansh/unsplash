import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';

import Logo from '../static/logo.svg';
import Like from '../static/like.svg';
import Plus from '../static/plus.svg';
import Download from '../static/download.svg';
import More from '../static/more.svg';

import Header from '../components/header';
import FullscreenImage from '../components/fullscreenImage';
import Footer from '../components/footer';
import User from '../components/user';
import Button from '../components/button';
import { rel } from '../utils/helpers';

import Menu from '../components/menu';

import {
  GetRandomPhotoQuery,
  likePhotoMutation,
  downloadPhotoMutation,
  testQuery,
  menuStatusQuery,
} from '../utils/graphql';

const ErrorMessage = styled.h1`
  font-size: 2rem;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* eslint-disable react/prop-types */
const Unsplash = adopt({
  isMenuOpen: ({ render }) => <Query query={menuStatusQuery}>{render}</Query>,
  randomPhoto: ({ render }) => (
    <Query query={GetRandomPhotoQuery}>{render}</Query>
  ),
  testQuery: ({ render }) => <Query query={testQuery}>{render}</Query>,
});
/* eslint-enable react/prop-types */

const Index = () => (
  <Unsplash>
    {({
      randomPhoto: { data, loading, error },
      isMenuOpen: {
        data: { isMenuOpen },
      },
    }) => {
      if (loading) return <p>loading...</p>;
      if (error) return <ErrorMessage>error...</ErrorMessage>;
      const randomPhoto = data.randomPhoto[0];

      return (
        <>
          <Head>
            <title>Unsplash Instant</title>
            <meta name="twitter:image" content={randomPhoto.urls.small} />
          </Head>
          <Header>
            <Link href="https://unsplash.com">
              <a id="logo" rel={rel} target="_blank">
                <Logo
                  css={`
                    height: 3.2rem;
                    width: 3.2rem;
                  `}
                />
              </a>
            </Link>
            <Mutation
              mutation={likePhotoMutation}
              variables={{
                id: randomPhoto.id,
              }}
            >
              {likePhoto => (
                <Button
                  onClick={likePhoto}
                  background={randomPhoto.liked_by_user && '#f15151'}
                >
                  <Like
                    fill={randomPhoto.liked_by_user ? 'white' : '#f15151'}
                  />
                  <span
                    style={{
                      color: randomPhoto.liked_by_user
                        ? 'white'
                        : 'currentColor',
                    }}
                  >
                    {randomPhoto.likes}
                  </span>
                </Button>
              )}
            </Mutation>
            <Button>
              <Plus fill="#777" />
            </Button>
            <Mutation
              mutation={downloadPhotoMutation}
              variables={{ id: randomPhoto.id }}
            >
              {downloadPhoto => (
                <Button
                  as="a"
                  css={`
                    margin-right: 1rem;
                  `}
                  target="_blank"
                  href={randomPhoto.urls.raw}
                  download={randomPhoto.id}
                  onClick={() => {
                    // log the download on unsplash
                    downloadPhoto();
                  }}
                >
                  <Download fill="#777" />
                </Button>
              )}
            </Mutation>
            <Button>
              <More fill="#777" />
            </Button>
            <Menu open={isMenuOpen} />
          </Header>
          <FullscreenImage
            background={randomPhoto.color}
            src={randomPhoto.urls.full}
            data-unsplash-url={randomPhoto.links.html}
            alt={
              randomPhoto.description ||
              `A wonderful photo by ${randomPhoto.user.name}`
            }
          />
          <Footer>
            <User
              user={randomPhoto.user}
              photoLocation={randomPhoto.location}
            />
          </Footer>
        </>
      );
    }}
  </Unsplash>
);

export default Index;
