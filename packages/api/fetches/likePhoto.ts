import fetch from 'node-fetch';
import getUrl, { headers } from './getUrl';

const likePhoto = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) => {
  const pathname = `/photos/${id}/like`;
  const url = getUrl({ pathname, accessToken });

  return fetch(url, {
    method: 'POST',
    headers,
  });
};

export default likePhoto;
