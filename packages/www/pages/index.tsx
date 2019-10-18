import React from 'react';
import Head from 'next/head';
import { useQuery } from 'urql';

import Header from '../components/header';
import FullscreenImage from '../components/fullscreenImage';
import Footer from '../components/footer';
import User from '../components/user';

import { GetRandomPhotoQuery } from '../utils/graphql';

const Index = () => {
  const [res, refetch] = useQuery({
    query: GetRandomPhotoQuery,
  });

  if (res.fetching) {
    return (
      <div
        css={`
          display: flex;
          min-height: 100vh;
          justify-content: center;
          align-items: center;

          h1 {
            font-family: 'SFProText-Regular';
            font-weight: 800;
            text-transform: uppercase;
          }
        `}
      >
        <h1>Fetching new photo...</h1>
      </div>
    );
  }

  if (res.error) return <pre>{JSON.stringify(res.error, null, 2)}</pre>;
  const randomPhoto = res.data.randomPhoto[0];

  return (
    <div>
      <Head>
        <title>Unsplash Instant</title>
        <meta name="twitter:image" content={randomPhoto.urls.small} />
      </Head>
      <Header
        id={randomPhoto.id}
        url={randomPhoto.urls.raw}
        likedByUser={randomPhoto.liked_by_user}
        likes={randomPhoto.likes}
        refetch={() => refetch({ requestPolicy: 'network-only' })}
      />
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
        <User user={randomPhoto.user} photoLocation={randomPhoto.location} />
      </Footer>
    </div>
  );
};

export default Index;
