import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import logoWebp from '@/Assets/Images/STYLED-logo.webp';
import STYLED_LOGO from '@/Assets/Images/STYLED-logo.png';
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
      <picture>
        <source
          srcSet={logoWebp}
          type="image/webp"
        />
        <StyledLogoImage
          draggable={false}
          src={STYLED_LOGO}
          alt="STYLED 로고"
        />
      </picture>
    </Button>
  );
};

export default Logo;
