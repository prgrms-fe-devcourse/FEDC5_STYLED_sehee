import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';

const MoveToSignUpButton = () => {
  const { colors, size } = useTheme();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/signup');
  };

  return (
    <Button
      width={size.full}
      textSize={size.large}
      textColor={colors.text}
      backgroundColor={colors.buttonBackground}
      borderRadius={size.small}
      hoverBackgroundColor={colors.buttonHoverBackground}
      hoverTextColor={colors.textReverse}
      onClick={handleOnClick}
      style={{
        padding: size.doubleLarge,
        border: `0.1rem solid ${colors.text}`,
      }}
    >
      회원가입
    </Button>
  );
};

export default MoveToSignUpButton;
