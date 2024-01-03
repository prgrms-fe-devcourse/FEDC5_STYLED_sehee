import { styled } from 'styled-components';
import Button from '@/Components/Base/Button';

const StyledButton = styled(Button)<{ $index: number; $tab: number }>`
  height: 100%;
  border-bottom: 3px solid
    ${({ $index, $tab, theme }) =>
      $index === $tab ? theme.colors.primary : null};
`;

export default StyledButton;
