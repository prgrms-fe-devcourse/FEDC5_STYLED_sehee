import { ForwardedRef, forwardRef } from 'react';
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
      backgroundColor = 'default',
      textColor = 'default',
      textSize = 'default',
      width = 'default',
      height = 'default',
      borderRadius = 'default',
      isActive,
      ...props
    }: ButtonProp,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <StyledButton
        $backgroundColor={backgroundColor}
        $textColor={textColor}
        $textSize={textSize}
        $width={width}
        $height={height}
        $borderRadius={borderRadius}
        $isActive={isActive}
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
