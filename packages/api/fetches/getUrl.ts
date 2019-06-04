import { format } from 'url';

export const headers = {
  Authorization: `Client-ID ${process.env.KEY}`,
};

export interface UrlOptions {
  pathname: string;
  accessToken?: string;
  width?: number;
  height?: number;
  random?: boolean;
  count?: number;
  orderBy?: 'latest' | 'oldest' | 'popular';
  curated?: boolean;
}

const getUrl = ({
  pathname = '/photos',
  random,
  count = 1,
  orderBy,
  curated,
  width,
  height,
  accessToken,
  ...query
}: UrlOptions) => {
  const defaultOptions = {
    protocol: 'https',
    hostname: 'api.unsplash.com',
    pathname,
    query: {
      ...query,
    },
  };

  if (accessToken) {
    // @ts-ignore
    defaultOptions.query.access_token = accessToken;
  }

  if (width) {
    // @ts-ignore
    defaultOptions.query.w = width;
  }

  if (height) {
    // @ts-ignore
    defaultOptions.query.h = height;
  }

  if (curated) {
    defaultOptions.pathname = '/photos/curated';
  }

  if (random) {
    defaultOptions.pathname = '/photos/random';
    // @ts-ignore
    defaultOptions.query.count = count;
  }

  if (count && !random) {
    // @ts-ignore
    defaultOptions.query.per_page = count;
  }

  if (orderBy) {
    // @ts-ignore
    defaultOptions.query.order_by = orderBy;
  }

  const url = format(defaultOptions);

  return url;
};

export default getUrl;
