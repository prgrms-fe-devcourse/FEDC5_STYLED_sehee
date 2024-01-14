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

  &:hover {
    background-color: ${(props) => props.$hoverBackgroundColor};
    color: ${(props) => props.$hoverTextColor};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) => props.$hoverBackgroundColor};
    color: ${(props) => props.$hoverTextColor};
  }

  ${({ $isActive, theme }) => `
    ${
      $isActive
        ? `background-color: ${theme.colors.focusHover}; color: ${theme.colors.focusHoverText};`
        : ''
    }
  `}

  &:disabled {
    cursor: not-allowed;
  }

  transition: all 0.5s ease;
`;

export default StyledButton;
