import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';

const MoveToSignUpButton = () => {
  const { colors, size } = useTheme();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/signUp');
  };

  return (
    <Button
      width={size.full}
      textSize={size.large}
      textColor={colors.buttonText}
      backgroundColor={colors.buttonBackground}
      borderRadius={size.small}
      hoverBackgroundColor={colors.buttonHoverBackground}
      hoverTextColor={colors.text}
      onClick={handleOnClick}
      style={{ padding: size.doubleLarge }}
    >
      회원가입
    </Button>
  );
};

export default MoveToSignUpButton;
