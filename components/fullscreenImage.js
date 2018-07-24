import styled from 'styled-components';

const FullscreenImage = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  display: block;
  background: ${({ background }) => background};
`;

export default FullscreenImage;
