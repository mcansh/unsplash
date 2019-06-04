import React from 'react';
import { downloadPhotoMutation } from '~/utils/graphql';
import VisuallyHidden from '@reach/visually-hidden';
import { useMutation } from 'graphql-hooks';
import Button from '~/components/button';
import Download from '~/static/download.svg';

const DownloadPhoto = ({ id, url }: { id: string; url: string }) => {
  const [downloadPhoto] = useMutation(downloadPhotoMutation, {
    variables: { id },
  });
  return (
    <Button
      as="a"
      css={`
        margin-right: 1rem;
      `}
      target="_blank"
      href={url}
      download={id}
      // @ts-ignore
      onClick={downloadPhoto}
    >
      <VisuallyHidden>Download Photo</VisuallyHidden>
      <Download fill="#777" />
    </Button>
  );
};

export default DownloadPhoto;
