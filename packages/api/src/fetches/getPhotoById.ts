import fetch from 'node-fetch';
import getUrl, { headers } from '../../utils/get-url';

const getPhotoById = async ({
  id,
  width,
  height,
}: {
  id: string;
  width?: number;
  height?: number;
}) => {
  const url = getUrl({ pathname: `/photos/${id}`, width, height });
  return fetch(url, { headers });
};

export default getPhotoById;
