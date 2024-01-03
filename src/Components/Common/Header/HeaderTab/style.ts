import { styled } from 'styled-components';
import { StyledLogoContainer } from '../HeaderLogo/style';
import Button from '@/Components/Base/Button';

export const StyledNavContainer = styled(StyledLogoContainer)`
  border-left: 1px solid gray;
  border-right: 1px solid gray;
`;

export const StyledButton = styled(Button)<{ $index: number; $tab: number }>`
  height: 100%;
  border-bottom: 3px solid
    ${({ $index, $tab, theme }) =>
      $index === $tab ? theme.colors.primary : null};
`;

export default StyledNavContainer;
