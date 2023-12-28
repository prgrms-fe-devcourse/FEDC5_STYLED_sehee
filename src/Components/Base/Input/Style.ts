import styled from 'styled-components';

export const Wrapper = styled.div<{ $block?: boolean }>`
  display: ${({ $block }) => ($block ? 'block' : 'inline-block')};
`;

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.size.medium};
`;

export const StyledInput = styled.input<{ $invalid?: boolean }>`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.alert : theme.colors.border};
  border-radius: 5px;
`;
