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
  user-select: none;
  padding: ${({ theme }) => `${theme.size.extraSmall} ${theme.size.small}`};
`;

export const StyledInput = styled.input<{ $invalid?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.size.extraSmall} ${theme.size.small}`};
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primaryDark};
  transition: border-bottom 0.3s ease;
  color: ${({ theme }) => theme.colors.backgroundReverse};

  &:focus {
    outline: none;
    border-bottom: 3px solid ${({ theme }) => theme.colors.backgroundReverse};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.alert};
`;
