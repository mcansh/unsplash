import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullScreenImageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: block;
  background: ${props => props.background};

  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const FullScreenImage = ({ background, ...props }) => (
  <FullScreenImageWrapper background={background}>
    <img {...props} />
  </FullScreenImageWrapper>
);

FullScreenImage.propTypes = {
  background: PropTypes.string.isRequired,
};

export default FullScreenImage;
