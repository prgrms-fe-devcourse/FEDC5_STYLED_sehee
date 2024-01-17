import styled from 'styled-components';

export const StyledUserList = styled.ul`
  padding: ${({ theme }) => theme.size.small} 0;
  display: flex;
  flex-direction: column;
  flex: 1 0 90%;
  overscroll-behavior: contain;
  overflow: auto;
`;

export const StyledNonList = styled.h1`
  height: ${({ theme }) => theme.size.full};
  font-size: ${({ theme }) => theme.size.large};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  align-items: center;
`;
