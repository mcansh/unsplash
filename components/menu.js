import React from 'react';
import styled from 'styled-components';

const PopOver = styled.div`
  position: absolute;
  top: 4rem;
  right: 2rem;
  border-radius: 0.3rem;
  padding: 1.5rem 2rem;
  text-align: right;
  color: white;
  background: black;
  transition: 300ms all cubic-bezier(0, 3.16, 0.58, 1),
    opacity 100ms ease-in-out;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transform: scale3d(${({ open }) => (open ? '1,1,1' : '0.8, 0.8, 0.8')});
`;

const Menu = ({ open }) => {
  if (!open) return null;

  return (
    <PopOver open={open}>
      <p>surprise!</p>
    </PopOver>
  );
};

export default Menu;
