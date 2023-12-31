import { styled } from 'styled-components';
import type { StyledButtonProp } from './type';

const StyledButton = styled.button<StyledButtonProp>`
  display: flex;
  justify-content: center;
  align-items: center;

  /* 받아오는 프롭이 'default'이다? 글로벌 테마 사용 */
  /* 다른 문자열 값일 경우, 그 값을 부여 */

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
