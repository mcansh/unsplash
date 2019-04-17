import React from 'react';
import { string, shape } from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { rel } from '../utils/helpers';

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
`;

const CustomLink = styled.a`
  text-decoration: none;
  display: block;
  color: white;
`;

const Name = styled(CustomLink)`
  font-size: 1.6rem;
`;

const Location = styled(CustomLink)`
  margin-top: 0.5rem;
  font-size: 1.1rem;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 3.2rem;
  width: 3.2rem;
  object-fit: cover;
  margin-right: 1rem;
`;

const User = ({ user, photoLocation }) => (
  <Wrap>
    <Avatar src={user.profile_image.small} alt={user.name} />
    <div>
      <Link href={`https://unsplash.com/${user.username}`} passHref>
        <Name rel={rel} target="_blank">
          {user.name}
        </Name>
      </Link>
      {photoLocation && (
        <Link
          href={`https://unsplash.com/photos/search/${photoLocation.name}`}
          passHref
        >
          <Location rel={rel} target="_blank">
            {photoLocation.name}
          </Location>
        </Link>
      )}
    </div>
  </Wrap>
);

User.propTypes = {
  user: shape({
    name: string.isRequired,
    username: string.isRequired,
    profile_image: shape({
      small: string.isRequired,
    }).isRequired,
  }).isRequired,
  photoLocation: shape({
    name: string,
  }),
};

User.defaultProps = {
  photoLocation: {
    name: null,
  },
};

export default User;
