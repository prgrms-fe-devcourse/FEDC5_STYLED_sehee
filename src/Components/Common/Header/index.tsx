import Icon from '@/Components/Base/Icon';
import {
  StyledHeaderContainer,
  StyledLogoContainer,
  StyledNavContainer,
  StyledUserContainer,
} from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';

const Header = () => {
  const styledNavIcon = { fontSize: '4.5rem', padding: '1rem' };
  const styledUserIcon = { fontSize: '4rem', padding: '1rem 0rem' };

  return (
    <StyledHeaderContainer>
      <StyledLogoContainer>
        <img
          src={logoBlack}
          alt="logo"
          style={{
            width: '9rem',
            padding: '1rem',
          }}
        />
      </StyledLogoContainer>
      <StyledNavContainer>
        <button type="button">
          <Icon
            name="home"
            style={styledNavIcon}
          />
        </button>
        <button type="button">
          <Icon
            name="add_circle"
            style={styledNavIcon}
          />
        </button>
        <button type="button">
          <Icon
            name="search"
            style={styledNavIcon}
          />
        </button>
      </StyledNavContainer>
      <StyledUserContainer>
        <button type="button">
          <Icon
            name="notifications"
            style={styledUserIcon}
          />
        </button>
        <button type="button">
          <Icon
            name="send"
            style={styledUserIcon}
          />
        </button>
        <button type="button">
          <Icon
            name="account_circle"
            style={{
              ...styledUserIcon,
              paddingRight: '1rem',
            }}
          />
        </button>
      </StyledUserContainer>
    </StyledHeaderContainer>
  );
};

export default Header;
