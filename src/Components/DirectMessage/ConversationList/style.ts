import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  width: 30%;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const StyledHeader = styled.div`
  display: flex;
  height: 7rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  justify-content: space-around;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};
`;

export const StyledBody = styled.div`
  height: calc(100% - 7rem);
  overflow-y: scroll;
`;
