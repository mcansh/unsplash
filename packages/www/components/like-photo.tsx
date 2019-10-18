import React from 'react';
import { useMutation } from 'urql';
// @ts-ignore
import VisuallyHidden from '@reach/visually-hidden';
import { likePhotoMutation } from '../utils/graphql';
import Like from '../static/like.svg';
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
  const [res, likePhoto] = useMutation(likePhotoMutation);

  if (res.error) {
    console.warn('oh noooooo!!', res.error);
  }

  return (
    <>
      <Button
        // @ts-ignore
        onClick={() => likePhoto({ id })}
        textColor={likedByUser ? 'white' : 'currentColor'}
        background={likedByUser ? '#f15151' : undefined}
      >
        <VisuallyHidden>Like Photo</VisuallyHidden>
        <Like fill={likedByUser ? 'white' : '#f15151'} />
        <span>{likes}</span>
      </Button>
    </>
  );
};

export default LikePhoto;
