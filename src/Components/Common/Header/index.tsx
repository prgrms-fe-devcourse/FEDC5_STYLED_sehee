import StyledHeaderContainer from './style';
import HeaderTab from './HeaderTab';
import HeaderUser from './HeaderUser';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  return (
    <StyledHeaderContainer>
      <HeaderLogo />
      <HeaderTab />
      <HeaderUser />
    </StyledHeaderContainer>
  );
};

export default Header;
