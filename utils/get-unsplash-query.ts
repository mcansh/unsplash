import { format } from 'url';

export const headers = {
  Authorization: `Client-ID ${process.env.UNSPLASH_KEY}`,
};

export interface UrlOptions {
  accessToken?: string;
  width?: number;
  height?: number;
  random?: boolean;
  count?: number;
  orderBy?: 'latest' | 'oldest' | 'popular';
}

const getUrl = ({
  random,
  count = 1,
  orderBy,
  width,
  height,
  accessToken,
  ...query
}: UrlOptions) => {
  const defaultQuery: { [key: string]: string | number } = { ...query };

  if (accessToken) {
    defaultQuery.access_token = accessToken;
  }

  if (width) {
    defaultQuery.w = width;
  }

  if (height) {
    defaultQuery.h = height;
  }

  if (random) {
    defaultQuery.count = count;
  }

  if (count && !random) {
    defaultQuery.per_page = count;
  }

  if (orderBy) {
    defaultQuery.order_by = orderBy;
  }

  return format({ query: defaultQuery });
};

export { getUrl };
