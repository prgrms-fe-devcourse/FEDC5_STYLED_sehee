import styled from 'styled-components';

const StyledCategoryItem = styled.li<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.textReverse : theme.colors.black};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.text : theme.colors.gray};
  border-radius: ${({ theme }) => theme.size.large};
  border: 1px solid transparent;
  padding: ${({ theme }) => theme.size.small};
  flex-shrink: 0;

  &:hover {
    scale: 1.1;
  }

  @media ${({ theme }) => theme.device.laptop} {
  }
`;

export default StyledCategoryItem;
