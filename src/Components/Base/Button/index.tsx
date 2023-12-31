import { useState } from 'react';
import StyledButton from './style';
import type { ButtonProp } from './type';

/**
 *
 * @param param0
 * @returns
 */

const Button = ({
  children,
  backgroundColor = 'default',
  textColor = 'default',
  textSize = 'default',
  width = 'default',
  height = 'default',
  borderRadius = 'default',
  isToggleButton = false,
  onClick,
  style,
}: ButtonProp) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleToggle = () => {
    setIsActive(!isActive);

    if (onClick) {
      onClick(isActive);
    }
  };

  return (
    <StyledButton
      onClick={isToggleButton ? handleToggle : handleClick}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $textSize={textSize}
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      $isActive={isActive}
      style={{ ...style }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
