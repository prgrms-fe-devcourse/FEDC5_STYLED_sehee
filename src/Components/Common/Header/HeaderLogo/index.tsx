import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { StyledContainer, StyledLogo } from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import logoWhite from '@/Assets/Images/STYLED-logo-white.png';

const HeaderLogo = () => {
  const { colors } = useTheme();
  return (
    <Link to="/">
      <StyledContainer>
        <StyledLogo
          src={colors.background === '#000000' ? logoWhite : logoBlack}
          alt="logo"
        />
      </StyledContainer>
    </Link>
  );
};

export default HeaderLogo;
