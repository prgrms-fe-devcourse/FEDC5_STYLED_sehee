import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { StyledContainer, StyledLogo } from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import logoWhite from '@/Assets/Images/STYLED-logo-white.png';
import useTabStore from '@/Stores/Tab';

const HeaderLogo = () => {
  const { colors } = useTheme();
  const { setTab, setPrev } = useTabStore();
  return (
    <StyledContainer>
      <Link to="/">
        <StyledLogo
          onClick={() => {
            setTab('home');
            setPrev('home');
          }}
          src={colors.background === '#000000' ? logoWhite : logoBlack}
          alt="logo"
        />
      </Link>
    </StyledContainer>
  );
};

export default HeaderLogo;
