import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FullScreenImageWrapper = styled.div<{ background: string }>`
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

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  background: string;
}

const FullScreenImage = ({ background, alt, ...props }: Props) => (
  <FullScreenImageWrapper background={background}>
    <img alt={alt} {...props} />
  </FullScreenImageWrapper>
);

FullScreenImage.propTypes = {
  background: PropTypes.string.isRequired,
};

export default FullScreenImage;
