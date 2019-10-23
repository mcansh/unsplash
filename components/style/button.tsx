import styled from 'styled-components';

interface Props {
  backgroundHoverColor?: string;
  backgroundColor?: string;
  textColor?: string;
  textHoverColor?: string;
}

const Button = styled.button<Props>`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${props => props.backgroundColor || 'rgba(255,255,255,0.8)'};
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0 1.1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  height: 3.2rem;
  line-height: 1.2;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  :hover {
    background: ${props => props.backgroundHoverColor || '#fff'};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
    span {
      color: ${props => props.textHoverColor};
    }
  }

  :not(:last-child) {
    margin-right: 0.9rem;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  span {
    color: ${props => props.textColor || '#777'};
  }

  svg + span {
    margin-left: 0.5rem;
  }
`;

export { Button };
