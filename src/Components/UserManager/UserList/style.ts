import styled from 'styled-components';

const StyledUserList = styled.ul`
  padding: ${({ theme }) => theme.size.small};
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 0 90%;

  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.size.small};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.size.extraSmall};
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.size.extraSmall};
  }
`;

export default StyledUserList;
