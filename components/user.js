import React from 'react';
import { string, shape } from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  align-items: center;
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
      <p>{user.name}</p>
      {photoLocation && <p>{photoLocation.title}</p>}
    </div>
  </Wrap>
);

User.propTypes = {
  user: shape({
    profile_image: shape({
      small: string.isRequired,
    }).isRequired,
  }).isRequired,
  photoLocation: shape({
    title: string,
  }),
};

User.defaultProps = {
  photoLocation: {
    title: null,
  },
};

export default User;
