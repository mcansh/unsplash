import React from 'react';
import styled from 'styled-components';
import Button from '~/components/button';
import Link from 'next/link';
import Logo from '../static/logo.svg';
import Plus from '../static/plus.svg';
import More from '../static/more.svg';
import { rel } from '../utils/helpers';
import DownloadPhoto from './download-photo';
import LikePhoto from './like-photo';

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
  }
`;

interface Props {
  id: string;
  likedByUser: boolean;
  url: string;
  likes: number;
}

const Header = ({ id, likedByUser, url, likes }: Props) => (
  <HeaderStyles>
    <Link href="https://unsplash.com">
      <a id="logo" rel={rel} target="_blank">
        <Logo
          style={{
            height: '3.2rem',
            width: '3.2rem',
          }}
        />
      </a>
    </Link>
    <LikePhoto id={id} likedByUser={likedByUser} likes={likes} />
    <Button>
      <Plus fill="#777" />
    </Button>
    <DownloadPhoto id={id} url={url} />
    <Button>
      <More fill="#777" />
    </Button>
  </HeaderStyles>
);

export default Header;
