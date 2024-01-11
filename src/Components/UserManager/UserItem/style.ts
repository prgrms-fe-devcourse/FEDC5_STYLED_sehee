import styled from 'styled-components';

export const StyledContainer = styled.li<{ $isOnline: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  background-color: ${({ theme }) => theme.colors.background};
  order: ${({ $isOnline }) => ($isOnline ? 0 : 1)};
  padding: ${({ theme }) => theme.size.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonClickHover};
    cursor: pointer;

    > span {
      color: ${({ theme }) => theme.colors.focusHoverText};
    }
  }
`;

export const StyledUserName = styled.span`
  font-size: ${({ theme }) => theme.size.medium};
  height: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text};
`;
