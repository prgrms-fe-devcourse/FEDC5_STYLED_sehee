import { useState } from 'react';
import StyledButton from './style';
import type { ButtonProp } from './type';

const Button = ({
  children,
  color,
  width,
  height,
  borderRound,
  isToggle = false,
  onClick = () => {},
  onActiveChange = () => {},
}: ButtonProp) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (isToggle) {
      setIsActive(!isActive);
      onActiveChange(isActive);

      return;
    }

    onClick();
  };

  return (
    <StyledButton
      onClick={handleClick}
      $color={color}
      $width={width}
      $height={height}
      $borderRound={borderRound}
      $isActive={isActive}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
