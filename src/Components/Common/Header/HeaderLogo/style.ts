import { styled } from 'styled-components';

export const StyledLogo = styled.img`
  width: 20rem;
  padding: 0.7rem;
  transition: transform 0.5s;
  user-select: none;

  &:hover {
    transform: scale(1.1);
  }
`;

export const StyledContainer = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-shrink: 0;
`;
