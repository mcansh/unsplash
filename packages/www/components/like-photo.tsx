import React from 'react';
import { useMutation } from 'graphql-hooks';
import VisuallyHidden from '@reach/visually-hidden';
import { likePhotoMutation } from '../utils/graphql';
import Like from '~/static/like.svg';
import Button from './button';

const LikePhoto = ({
  id,
  likes,
  likedByUser,
}: {
  id: string;
  likes: number;
  likedByUser: boolean;
}) => {
  const [likePhoto] = useMutation(likePhotoMutation, {
    variables: { id },
  });

  return (
    <>
      <Button
        // @ts-ignore
        onClick={likePhoto}
        textColor={likedByUser ? 'white' : 'currentColor'}
        background={likedByUser && '#f15151'}
      >
        <VisuallyHidden>Like Photo</VisuallyHidden>
        <Like fill={likedByUser ? 'white' : '#f15151'} />
        <span>{likes}</span>
      </Button>
    </>
  );
};

export default LikePhoto;
