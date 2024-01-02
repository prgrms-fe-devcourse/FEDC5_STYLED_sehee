import { styled } from 'styled-components';
import type { StyledButtonProp } from './type';

const StyledButton = styled.button<StyledButtonProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({
    $backgroundColor,
    $textColor,
    $textSize,
    $width,
    $height,
    $borderRadius,
    $isActive,
    theme,
  }) => `
    background-color: ${
      $backgroundColor === 'default'
        ? theme.colors.buttonBackground
        : $backgroundColor
    };
    color: ${$textColor === 'default' ? theme.colors.buttonText : $textColor};
    font-size: ${$textSize === 'default' ? '1rem' : $textSize};
    width: ${$width === 'default' ? '120px' : $width};
    height: ${$height === 'default' ? '10px' : $height};
    border-radius: ${$borderRadius === 'default' ? '15px' : $borderRadius};
    ${
      $isActive
        ? `background-color: ${theme.colors.focusHover}; color: ${theme.colors.focusHoverText};`
        : ''
    }
  `}
`;

export default StyledButton;
