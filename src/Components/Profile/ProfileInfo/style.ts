import { styled } from 'styled-components';

export const StyledProfileInfoContainer = styled.div`
  display: flex;
  justify-content: left;
  text-align: center;
  padding: 5rem 13rem 4rem 26%;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  margin-top: 4rem;
`;

export const StyledName = styled.div`
  font-size: 2.7rem;
  padding: 0 6rem 0 3rem;
  color: ${({ theme }) => theme.colors.primary};
`;
