import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import StyledLogoImage from './style';
import Props from './type';
import STYLED_LOGO_BLACK from '@/Assets/Images/STYLED-logo-black.png';
// import STYLED_LOGO_WHITE from '@/Assets/Images/STYLED-logo-white.png';

const Logo = ({ width = '15rem', height = '10rem', ...props }: Props) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <Button
      width={width}
      height={height}
      backgroundColor="transparent"
      onClick={handleOnClick}
      {...props}
    >
      {/* 라이트 모드일 떄 검은 로고, 다크 모드일 때 흰 로고 */}
      <StyledLogoImage
        src={STYLED_LOGO_BLACK}
        alt="STYLED_LOGO"
      />
    </Button>
  );
};

export default Logo;
