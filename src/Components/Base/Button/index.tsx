import { ForwardedRef, forwardRef } from 'react';
import { useTheme } from 'styled-components';
import StyledButton from './style';
import type { ButtonProp } from './type';

/**
 * props에 존재하는 속성들은 해당 prop들을 통해 변경해주세요.
 * style={{ padding: '10px 20px' }} 과 같이 프롭스에 없는 스타일을 부여해줄 수 있습니다.
 */

const Button = forwardRef(
  (
    {
      children,
      backgroundColor,
      textColor,
      textSize,
      width,
      height,
      borderRadius,
      hoverBackgroundColor,
      hoverTextColor,
      isActive,
      isHoverBold,
      isBold,
      ...props
    }: ButtonProp,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const theme = useTheme();

    return (
      <StyledButton
        $backgroundColor={backgroundColor || theme.colors.buttonBackground}
        $textColor={textColor || theme.colors.buttonText}
        $textSize={textSize || '1rem'}
        $width={width || '120px'}
        $height={height || '10px'}
        $borderRadius={borderRadius || '15px'}
        $hoverBackgroundColor={hoverBackgroundColor || theme.colors.focusHover}
        $hoverTextColor={hoverTextColor || theme.colors.focusHoverText}
        $isActive={isActive}
        $isHoverBold={isHoverBold || false}
        $isBold={isBold || false}
        ref={ref}
        {...props}
      >
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = 'Button';

export default Button;
