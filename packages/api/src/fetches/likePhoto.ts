import fetch from 'node-fetch';
import getUrl from '../../utils/get-url';

const likePhoto = async ({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) => {
  const url = `https://api.unsplash.com/photos/${id}/like`;

  return fetch(url, {
    method: 'POST',
    headers: {
      authorization: accessToken,
    },
  });
};

export default likePhoto;
