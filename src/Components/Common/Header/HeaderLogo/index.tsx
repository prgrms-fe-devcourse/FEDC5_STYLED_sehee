import { Link } from 'react-router-dom';
import { StyledContainer, StyledLogo } from './style';

import logo from '@/Assets/Images/STYLED-logo.png';
import useTabStore from '@/Stores/Tab';
import { useChannelStore } from '@/Stores';
import useResize from '@/Hooks/useResize';

const HeaderLogo = () => {
  const { setTab, setPrev } = useTabStore();
  const { setCurrentChannelId } = useChannelStore();
  const { isMobileSize } = useResize();
  return (
    <StyledContainer>
      <Link to="/">
        <StyledLogo
          onClick={() => {
            setTab('home');
            setPrev('home');
            if (!isMobileSize) setCurrentChannelId('');
          }}
          src={logo}
          alt="logo"
        />
      </Link>
    </StyledContainer>
  );
};

export default HeaderLogo;
