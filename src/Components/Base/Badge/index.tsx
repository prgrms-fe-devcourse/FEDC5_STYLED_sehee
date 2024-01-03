import { ForwardedRef, forwardRef } from 'react';
import { useTheme } from 'styled-components';
import StyledBadge from './style';
import { BadgeProp } from './type';

/**
 * Badge 컴포넌트를 사용하는 상위 요소의 position: relative 속성을 확인해주세요
 * @param size: px, rem 단위를 포함한 문자열 형태로 전달해주세요
 */
const Badge = forwardRef(
  (
    {
      children,
      size = '0.8rem',
      position,
      backgroundColor,
      textColor,
      textSize,
      ...props
    }: BadgeProp,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    const theme = useTheme();

    const isSingleDigit =
      String(children).length <= 2 || children === undefined;
    const shape = isSingleDigit ? 'circle' : 'ellipse';
    const isOverDigit = Number(children) >= 99;

    const parsedSize = parseFloat(size);
    const halfSize = Number.isNaN(parsedSize) ? size : `${parsedSize / 2}rem`;

    return (
      <StyledBadge
        ref={ref}
        $size={size}
        $position={position || 'rightTop'}
        $backgroundColor={backgroundColor || theme.colors.alert}
        $textColor={textColor || theme.colors.buttonText}
        $textSize={textSize || halfSize}
        $shape={shape}
        {...props}
      >
        {isOverDigit ? '99+' : children}
      </StyledBadge>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
