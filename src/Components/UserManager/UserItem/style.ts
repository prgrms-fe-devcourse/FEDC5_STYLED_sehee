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
  padding: ${({ theme }) =>
    `${theme.size.small} ${theme.size.small} ${theme.size.small} ${theme.size.large}`};
  order: ${({ $isAuth, $isOnline }) => getOrderValue($isAuth, $isOnline)};

  transition: all 0.5s ease;
  border-bottom: ${({ $isAuth, theme }) =>
    $isAuth && `1px solid ${theme.colors.text}`};
  padding: ${({ $isAuth }) => $isAuth && '2rem 0rem 2rem 2rem'};
  margin-bottom: ${({ $isAuth }) => $isAuth && '2rem'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
  }
`;

export const StyledUserName = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledMySelfUser = styled.div``;
