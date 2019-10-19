import styled from 'styled-components';

const Button = styled.button`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${props => props.background || 'rgba(255,255,255,0.8)'};
  color: #777;
  border-radius: 0.6rem;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.85rem 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);

  &:not(:last-of-type) {
    margin-right: 1rem;
  }

  svg {
    height: 1.5rem;
    width: 1.5rem;
  }

  svg + span {
    margin-left: 0.5rem;
  }
`;

export default Button;
