import styled from 'styled-components';

export const StyledNotificationList = styled.ul`
  padding: ${({ theme }) => theme.size.medium} 0;
  overscroll-behavior: contain;
  overflow: auto;
  flex-grow: 1;

  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.size.small};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.backgroundGrey};
    border-radius: ${({ theme }) => theme.size.extraSmall};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.size.extraSmall};
  }
`;

export const StyledNonList = styled.h1`
  height: ${({ theme }) => theme.size.full};
  font-size: ${({ theme }) => theme.size.large};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
`;
