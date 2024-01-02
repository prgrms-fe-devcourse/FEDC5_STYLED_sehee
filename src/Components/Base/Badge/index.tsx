import { ForwardedRef, forwardRef } from 'react';
import { useTheme } from 'styled-components';
import StyledBadge from './style';
import { BadgeProp } from './type';

/**
 * Badge 컴포넌트를 사용하는 상위 요소의 position: relative 속성을 확인해주세요
 */
const Badge = forwardRef(
  (
    {
      children,
      size,
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

    return (
      <StyledBadge
        ref={ref}
        $size={size || '0.8rem'}
        $position={position || 'rightTop'}
        $backgroundColor={backgroundColor || theme.colors.alert}
        $textColor={textColor || theme.colors.buttonText}
        $textSize={textSize || '0.4rem'}
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
