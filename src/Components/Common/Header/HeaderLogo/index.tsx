import { Link } from 'react-router-dom';
import { StyledContainer, StyledLogo } from './style';

import logo from '@/Assets/Images/STYLED-logo.png';
import useTabStore from '@/Stores/Tab';

const HeaderLogo = () => {
  const { setTab, setPrev } = useTabStore();
  return (
    <StyledContainer>
      <Link to="/">
        <StyledLogo
          onClick={() => {
            setTab('home');
            setPrev('home');
          }}
          src={logo}
          alt="logo"
        />
      </Link>
    </StyledContainer>
  );
};

export default HeaderLogo;
