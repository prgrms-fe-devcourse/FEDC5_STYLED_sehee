import StyledHeaderContainer from './style';
import HeaderTab from './HeaderTab';
import HeaderLogo from './HeaderLogo';
import HeaderProps from './type';

const Header = ({ activeHeader }: HeaderProps) => {
  // 로그인/회원가입 페이지일시 헤더 없음
  if (!activeHeader) return null;

  return (
    <StyledHeaderContainer>
      <HeaderLogo />
      <HeaderTab />
    </StyledHeaderContainer>
  );
};

export default Header;
