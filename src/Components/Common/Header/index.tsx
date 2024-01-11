// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import StyledHeaderContainer from './style';
import HeaderTab from './HeaderTab';
import HeaderLogo from './HeaderLogo';
import HeaderProps from './type';
// import useTabStore from '@/Stores/Tab';

const Header = ({ activeHeader }: HeaderProps) => {
  // 뒤로가기 핸들러..
  /** 
  const { prev, setTab } = useTabStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      setTab(prev);
      console.log('back'); // 콘솔 안찍힘
    };

    window.addEventListener('popstate', handleBack);

    return () => {
      window.removeEventListener('popstate', handleBack);
    };
  }, [prev, setTab, navigate]);
  */

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
