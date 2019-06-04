import fetch from 'node-fetch';
import getUrl, { headers } from './getUrl';

const downloadPhoto = async ({ id }: { id: string }) => {
  const pathname = `/photos/${id}/download`;
  const url = getUrl({ pathname });

  return fetch(url, {
    method: 'POST',
    headers,
  });
};

export default downloadPhoto;
