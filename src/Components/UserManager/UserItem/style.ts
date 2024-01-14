import styled from 'styled-components';

const getOrderValue = ($isAuth: boolean, $isOnline: boolean) => {
  if ($isAuth) return -1;
  return $isOnline ? 0 : 1;
};

export const StyledContainer = styled.li<{
  $isOnline: boolean;
  $isAuth: boolean;
}>`
  font-size: ${({ theme }) => theme.size.medium};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) =>
    `${theme.size.small} ${theme.size.small} ${theme.size.small} ${theme.size.large}`};
  order: ${({ $isAuth, $isOnline }) => getOrderValue($isAuth, $isOnline)};

  &:hover {
    background-color: ${({ theme }) => theme.colors.focusHover};
    cursor: pointer;

    > span {
      color: ${({ theme }) => theme.colors.focusHoverText};
    }
  }
`;

export const StyledUserName = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
