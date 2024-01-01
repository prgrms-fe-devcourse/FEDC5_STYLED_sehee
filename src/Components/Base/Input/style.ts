import styled from 'styled-components';

export const StyledWrapper = styled.div<{ $block?: boolean }>`
  display: ${({ $block }) => ($block ? 'block' : 'inline-block')};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.size.medium};
`;

export const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.size.small};
`;

export const StyledLabel = styled.label`
  display: block;
`;

export const StyledInput = styled.input<{ $invalid?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.size.extraSmall} ${theme.size.small}`};
  border: 1px solid
    ${({ $invalid, theme }) =>
      $invalid ? theme.colors.alert : theme.colors.border};
  border-radius: ${({ theme }) => theme.size.small};
`;

export const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.alert};
`;
