import fetch from 'node-fetch';
import getUrl, { headers, UrlOptions } from '../../utils/get-url';

const getPhotos = (options: UrlOptions) => {
  const url = getUrl(options);
  return fetch(url, { headers });
};

export default getPhotos;
