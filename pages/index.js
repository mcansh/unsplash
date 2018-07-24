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

import {
  GetRandomPhotoQuery,
  likePhotoMutation,
  downloadPhotoMutation,
  testQuery,
} from '../utils/graphql';

const ErrorMessage = styled.h1`
  font-size: 2rem;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Unsplash = adopt({
  randomPhoto: ({ render }) => (
    <Query query={GetRandomPhotoQuery}>{render}</Query>
  ),
  testQuery: ({ render }) => <Query query={testQuery}>{render}</Query>,
});

const Index = () => (
  <Unsplash>
    {({ randomPhoto: { data, loading, error } }) => {
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
              <a id="logo" rel="noopener external nofollow" target="_blank">
                <Logo height={32} width={32} />
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
                  onClick={() => {
                    // log the download on unsplash
                    downloadPhoto();

                    // create a link and open the image
                    const button = document.createElement('a');
                    button.target = '_blank';
                    button.href = randomPhoto.urls.raw;
                    button.download = randomPhoto.id;
                    button.click();
                    button.remove();
                  }}
                >
                  <Download fill="#777" />
                </Button>
              )}
            </Mutation>
            <Button>
              <More fill="#777" />
            </Button>
          </Header>
          <FullscreenImage
            src={randomPhoto.urls.full}
            alt={
              randomPhoto.description ||
              `A wonderful photo by ${randomPhoto.user.name}`
            }
            background={randomPhoto.color}
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
