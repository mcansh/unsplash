import React from 'react';
import styled from 'styled-components';
import VisuallyHidden from '@reach/visually-hidden';

import { Button } from './style/button';

import Download from '~/public/static/download.svg';
import Logo from '~/public/static/logo.svg';
import Plus from '~/public/static/plus.svg';
import More from '~/public/static/more.svg';
import { useDownloadPhotoMutation } from '~/generated/graphql';

const HeaderStyles = styled.header`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  #logo {
    margin-right: auto;
    svg {
      width: 3.2rem;
      height: 3.2rem;
      fill: white;
    }
  }
`;

interface Props {
  id: string;
  likedByUser: boolean;
  url: string;
  likes: number;
  refetch: VoidFunction;
}

const Header: React.FC<Props> = ({ id, url, refetch }) => {
  const [res, downloadPhoto] = useDownloadPhotoMutation();
  return (
    <HeaderStyles>
      <a href="https://unsplash.com" id="logo">
        <Logo />
      </a>
      <Button type="button">
        <Plus css={{ fill: '#777' }} />
      </Button>
      <Button
        disabled={res.fetching}
        type="button"
        onClick={() => {
          downloadPhoto({ id });
          const download = document.createElement('a');
          download.download = `${id}.jpg`;
          download.href = url;
          download.target = '_blank';
          download.rel = 'noopener external nofollow noreferrer';
          download.click();
          download.remove();
        }}
      >
        <VisuallyHidden>Download Photo</VisuallyHidden>
        <Download css={{ fill: '#777' }} />
      </Button>
      <Button type="button">
        <More css={{ fill: '#777' }} />
      </Button>
      <Button type="button" onClick={refetch}>
        New Photo
      </Button>
    </HeaderStyles>
  );
};

export { Header };
