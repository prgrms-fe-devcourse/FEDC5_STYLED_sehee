import styled from 'styled-components';

export const StyledHeaderContainer = styled.div`
  height: 9.4rem;
`;

export const StyledBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: calc(100vh-9.4rem);
  text-align: center;
`;
