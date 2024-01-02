import { useState } from 'react';
import Icon from '@/Components/Base/Icon';
import {
  StyledHeaderContainer,
  StyledLogoContainer,
  StyledNavContainer,
  StyledUserContainer,
} from './style';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';

const Header = () => {
  const [isUser, setUser] = useState(false);
  const styledNavIcon = { fontSize: '4.5rem', padding: '1.5rem' };
  const styledUserIcon = { fontSize: '4rem', padding: '1rem' };

  /**
   * Todo
   * 1. nav 요소 토글
   * 2. 페이지 이동
   * 3. 테마 적용
   */

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
        <button
          type="button"
          style={{ height: '100%', borderBottom: '3px solid black' }}
          onClick={() => alert('home')}
        >
          <Icon
            name="home"
            style={styledNavIcon}
          />
        </button>
        <button
          type="button"
          onClick={() => alert('add')}
        >
          <Icon
            name="add_circle"
            style={styledNavIcon}
          />
        </button>
        <button
          type="button"
          onClick={() => alert('search')}
        >
          <Icon
            name="search"
            style={styledNavIcon}
          />
        </button>
      </StyledNavContainer>
      <StyledUserContainer>
        {!isUser ? (
          <button
            type="button"
            onClick={() => setUser(true)}
          >
            로그인
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => alert('alert')}
            >
              <Icon
                name="notifications"
                style={styledUserIcon}
              />
            </button>
            <button
              type="button"
              onClick={() => alert('msg')}
            >
              <Icon
                name="send"
                style={styledUserIcon}
              />
            </button>
            <button
              type="button"
              onClick={() => alert('account')}
            >
              <Icon
                name="account_circle"
                style={{
                  ...styledUserIcon,
                  paddingRight: '2.5rem',
                }}
              />
            </button>
          </>
        )}
      </StyledUserContainer>
    </StyledHeaderContainer>
  );
};

export default Header;
