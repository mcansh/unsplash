import React from 'react';
import Head from 'next/head';
import { useQuery } from 'graphql-hooks';

import Header from '../components/header';
import FullscreenImage from '../components/fullscreenImage';
import Footer from '../components/footer';
import User from '../components/user';

import { GetRandomPhotoQuery } from '../utils/graphql';

const Index = () => {
  const { loading, error, data } = useQuery(GetRandomPhotoQuery);
  if (loading) return <p>loading...</p>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  const randomPhoto = data.randomPhoto[0];

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
