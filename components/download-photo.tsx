import React from 'react';
import { downloadPhotoMutation } from '~/utils/graphql';
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
      onClick={downloadPhoto}
    >
      <Download fill="#777" />
    </Button>
  );
};

export default DownloadPhoto;
