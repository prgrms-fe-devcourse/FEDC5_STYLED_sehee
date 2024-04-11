import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import logo from '@/Assets/Images/STYLED-logo.webp';
import StyledLogoImage from './style';
import Props from './type';

const Logo = ({ width = '25rem', height = '10rem', ...props }: Props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <Button
      width={width}
      height={height}
      backgroundColor="transparent"
      hoverBackgroundColor="transparent"
      onClick={handleOnClick}
      {...props}
    >
      <StyledLogoImage
        draggable={false}
        src={logo}
        alt="STYLED 로고"
      />
    </Button>
  );
};

export default Logo;
