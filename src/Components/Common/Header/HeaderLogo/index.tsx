import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { StyledLogo, StyledLogoContainer } from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import logoWhite from '@/Assets/Images/STYLED-logo-white.png';

const HeaderLogo = () => {
  const { colors } = useTheme();
  return (
    <Link to="/">
      <StyledLogoContainer>
        <StyledLogo
          src={colors.background === '#000000' ? logoWhite : logoBlack}
          alt="logo"
        />
      </StyledLogoContainer>
    </Link>
  );
};

export default HeaderLogo;
