import { useState } from 'react';
import StyledButton from './style';
import type { ButtonProp } from './type';

/**
 * props에 존재하는 속성들은 해당 prop들을 통해 변경해주세요.
 * style={{ padding: '10px 20px' }} 과 같이 프롭스에 없는 스타일을 부여해줄 수 있습니다.
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
  onClickButton,
  style,
}: ButtonProp) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (onClickButton) {
      onClickButton();
    }
  };

  const handleToggle = () => {
    setIsActive(!isActive);

    if (onClickButton) {
      onClickButton(isActive);
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
