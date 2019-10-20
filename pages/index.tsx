import React from 'react';
import { NextPage } from 'next';
import { useQuery } from 'urql';
import Head from 'next/head';

import withUrqlClient from '~/lib/with-urql-client';
import { GetRandomPhotoQuery } from '~/utils/graphql';

const Index: NextPage = () => {
  const [{ data, error, fetching }] = useQuery({
    query: GetRandomPhotoQuery,
    requestPolicy: 'cache-first',
  });

  if (fetching) {
    return <h1>Fetching photo...</h1>;
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  const [randomPhoto] = data.randomPhoto;

  console.log(randomPhoto);

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
