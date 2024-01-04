import StyledHeaderContainer from './style';
import HeaderTab from './HeaderTab';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  return (
    <StyledHeaderContainer>
      <HeaderLogo />
      <HeaderTab />
    </StyledHeaderContainer>
  );
};

export default Header;
