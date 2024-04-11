import { Link } from 'react-router-dom';

import useTabStore from '@/Stores/Tab';
import { useChannelStore } from '@/Stores';
import useResize from '@/Hooks/useResize';
import logo from '@/Assets/Images/STYLED-logo.png';
import logoWebp from '@/Assets/Images/STYLED-logo.webp';
import { StyledContainer, StyledLogo } from './style';

const HeaderLogo = () => {
  const { setTab, setPrev } = useTabStore();
  const { setCurrentChannelId } = useChannelStore();
  const { isMobileSize } = useResize();
  return (
    <StyledContainer>
      <Link to="/">
        <picture>
          <source
            srcSet={logoWebp}
            type="image/webp"
          />
          <StyledLogo
            onClick={() => {
              setTab('home');
              setPrev('home');
              if (!isMobileSize) setCurrentChannelId('');
            }}
            src={logo}
            alt="logo"
          />
        </picture>
      </Link>
    </StyledContainer>
  );
};

export default HeaderLogo;
