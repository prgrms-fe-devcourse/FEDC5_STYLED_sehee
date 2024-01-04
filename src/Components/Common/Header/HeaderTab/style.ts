import { styled } from 'styled-components';
import Button from '@/Components/Base/Button';

export const StyledButton = styled(Button)<{ $index: number; $tab: number }>`
  height: 100%;
  border-bottom: 3px solid
    ${({ $index, $tab, theme }) =>
      $index === $tab ? theme.colors.primary : null};
`;

export const StyledUserContainer = styled.div`
  align-items: center;
  justify-content: right;
  display: flex;
`;
