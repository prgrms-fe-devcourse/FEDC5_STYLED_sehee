import styled from 'styled-components';

const StyledCategoryItem = styled.li<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.buttonText : 'black'};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary : theme.colors.backgroundGrey};
  border-radius: ${({ theme }) => theme.size.large};
  border: 1px solid transparent;
  padding: ${({ theme }) => theme.size.small};

  &:hover {
    scale: 1.1;
  }
`;

export default StyledCategoryItem;
