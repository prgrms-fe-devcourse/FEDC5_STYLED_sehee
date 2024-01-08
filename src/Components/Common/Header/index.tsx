import StyledHeaderContainer from './style';
import HeaderTab from './HeaderTab';
import HeaderLogo from './HeaderLogo';

const Header = () => {
  // 로그인/회원가입 페이지일시 헤더 없음
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
