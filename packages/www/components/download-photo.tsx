import React from 'react';
// @ts-ignore
import VisuallyHidden from '@reach/visually-hidden';
import { useMutation } from 'urql';
import { downloadPhotoMutation } from '../utils/graphql';
import Download from '../static/download.svg';
import Button from './button';

const DownloadPhoto = ({ id, url }: { id: string; url: string }) => {
  const [res, downloadPhoto] = useMutation(downloadPhotoMutation);

  if (res.error) {
    console.warn('oh no!');
  }

  return (
    // @ts-ignore
    <Button
      as="a"
      css={`
        margin-right: 1rem;
      `}
      target="_blank"
      href={url}
      download={id}
      onClick={() => downloadPhoto({ id })}
    >
      <VisuallyHidden>Download Photo</VisuallyHidden>
      <Download fill="#777" />
    </Button>
  );
};

export default DownloadPhoto;
