import styled from 'styled-components';

export const StyledFollowContainer = styled.div`
  float: left;
  padding: 2rem 3rem 0;
`;

export const StyledPost = styled.span`
  font-size: 1.4rem;
  margin-right: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StyledFollow = styled(StyledPost)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
`;
