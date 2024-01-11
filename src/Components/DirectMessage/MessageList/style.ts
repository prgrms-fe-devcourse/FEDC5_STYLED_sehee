import { styled } from 'styled-components';

export const StyledContainer = styled.div`
  width: 70%;
  height: calc(100% - 7rem);
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2rem;
  height: 7rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 2rem;
  font-size: ${({ theme }) => theme.size.medium};
`;

export const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  overflow-y: scroll;
  height: calc(95% - 7rem);
`;

export const MessageItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
