import { styled } from 'styled-components';
import type { StyledButtonProp } from './type';

const StyledButton = styled.button<StyledButtonProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.$backgroundColor};
  color: ${(props) => props.$textColor};
  font-size: ${(props) => props.$textSize};

  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  border-radius: ${(props) => props.$borderRadius};
  font-weight: ${(props) => (props.$isBold ? '900' : 'normal')};

  &:hover {
    background-color: ${(props) => props.$hoverBackgroundColor};
    color: ${(props) => props.$hoverTextColor};
    font-weight: ${(props) => (props.$isHoverBold ? '900' : 'normal')};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.$hoverBackgroundColor};
    color: ${(props) => props.$hoverTextColor};
  }

  ${({ $isActive, theme }) => `
    ${
      $isActive
        ? `background-color: ${theme.colors.text}; color: ${theme.colors.textReverse};`
        : ''
    }
  `}

  &:disabled {
    cursor: not-allowed;
  }

  transition: all 0.3s ease;
`;

export default StyledButton;
