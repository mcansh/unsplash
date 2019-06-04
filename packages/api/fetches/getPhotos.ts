import fetch from 'node-fetch';
import getUrl, { headers, UrlOptions } from './getUrl';

const getPhotos = (options: UrlOptions) => {
  const url = getUrl(options);
  return fetch(url, { headers });
};

export default getPhotos;
