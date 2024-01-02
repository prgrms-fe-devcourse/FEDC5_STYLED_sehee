import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import {
  StyledHeaderContainer,
  StyledLogo,
  StyledLogoContainer,
} from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import logoWhite from '@/Assets/Images/STYLED-logo-white.png';
import HeaderTab from './HeaderTab';
import HeaderUser from './HeaderUser';

const Header = () => {
  const { colors } = useTheme();

  return (
    <StyledHeaderContainer>
      <Link to="/">
        <StyledLogoContainer>
          <StyledLogo
            src={colors.background === '#000000' ? logoWhite : logoBlack}
            alt="logo"
          />
        </StyledLogoContainer>
      </Link>
      <HeaderTab />
      <HeaderUser />
    </StyledHeaderContainer>
  );
};

export default Header;
