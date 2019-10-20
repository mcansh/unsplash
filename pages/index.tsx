import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import withUrqlClient from '~/lib/with-urql-client';
import { useRandomPhotoQueryQuery } from '~/generated/graphql';
import { FullscreenImage } from '~/components/fullscreen-image';
import { Header } from '~/components/header';

const Index: NextPage = () => {
  const [{ data, error, fetching }, executeQuery] = useRandomPhotoQueryQuery();

  if (fetching) {
    return <h1>Fetching photo...</h1>;
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (!data || !data.randomPhoto) {
    return <h1>No Photos pls</h1>;
  }

  const [randomPhoto] = data.randomPhoto;

  return (
    <>
      <Head>
        <title>Unsplash Instant</title>
        <meta name="twitter:image" content={randomPhoto.urls.small} />
      </Head>

      <Header
        id={randomPhoto.id}
        url={randomPhoto.urls.raw}
        likedByUser={randomPhoto.liked_by_user || false}
        likes={randomPhoto.likes}
        refetch={() => executeQuery({ requestPolicy: 'network-only' })}
      />
      <FullscreenImage
        src={randomPhoto.urls.full}
        unsplashUrl={randomPhoto.links.html}
        alt={
          randomPhoto.description ||
          `A wonderful photo by ${randomPhoto.user.name}`
        }
        backgroundColor={randomPhoto.color}
      />
    </>
  );
};

export default withUrqlClient(Index);
