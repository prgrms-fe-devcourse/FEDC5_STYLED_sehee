import StyledHeaderContainer from './style';
import HeaderTab from './HeaderTab';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  if (
    window.location.pathname === '/login' ||
    window.location.pathname === '/signup'
  )
    return null;

  return (
    <StyledHeaderContainer>
      <HeaderLogo />
      <HeaderTab />
    </StyledHeaderContainer>
  );
};

export default Header;
