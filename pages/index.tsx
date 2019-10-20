import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import withUrqlClient from '~/lib/with-urql-client';
import { useRandomPhotoQueryQuery } from '~/generated/graphql';

const Index: NextPage = () => {
  const [{ data, error, fetching }] = useRandomPhotoQueryQuery();

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

      <img
        src={randomPhoto.urls.full}
        data-unsplash-url={randomPhoto.links.html}
        css={{
          height: '100vh',
          width: '100vw',
          backgroundColor: randomPhoto.color,
          objectFit: 'cover',
        }}
        alt={
          randomPhoto.description ||
          `A wonderful photo by ${randomPhoto.user.name}`
        }
      />
    </>
  );
};

export default withUrqlClient(Index);
