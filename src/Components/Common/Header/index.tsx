import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/Components/Base/Icon';
import {
  StyledHeaderContainer,
  StyledLogo,
  StyledLogoContainer,
  StyledNavContainer,
  StyledUserContainer,
} from './style';

import Button from '@/Components/Base/Button';
import PostModal from '../Modal/PostModal';
import AlarmModal from '../Modal/AlarmModal';
import SearchModal from '../Modal/SearchModal';

const Header = () => {
  const [isUser, setUser] = useState(false);

  const [post, setPost] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [search, setSearch] = useState(false);

  const styledNavIcon = { fontSize: '4.5rem', padding: '1.5rem' };
  const styledUserIcon = { fontSize: '4rem', padding: '1rem' };

  /**
   * Todo
   * 1. nav 요소 토글
   * 3. 테마 적용 > 밑에 줄 색
   */

  return (
    <StyledHeaderContainer>
      <StyledLogoContainer>
        <StyledLogo
          alt="logo"
          style={{
            width: '9rem',
            padding: '1rem',
          }}
        />
      </StyledLogoContainer>
      <StyledNavContainer>
        <Link to="/">
          <Button
            backgroundColor="transparent"
            width="fit-content"
            type="button"
            borderRadius="0"
            style={{ height: '100%', borderBottom: '3px solid black' }}
          >
            <Icon
              name="home"
              isFill={false}
              style={styledNavIcon}
            />
          </Button>
        </Link>
        <Button
          backgroundColor="transparent"
          width="fit-content"
          type="button"
          borderRadius="0"
          onClick={() => setPost(true)}
        >
          <Icon
            name="add_circle"
            isFill={false}
            style={styledNavIcon}
          />
          {post && <PostModal onChangeOpen={() => setPost(false)} />}
        </Button>
        <Button
          backgroundColor="transparent"
          width="fit-content"
          type="button"
          borderRadius="0"
          onClick={() => setSearch(true)}
        >
          <Icon
            name="search"
            style={styledNavIcon}
          />
          {search && <SearchModal onChangeOpen={() => setSearch(false)} />}
        </Button>
      </StyledNavContainer>
      <StyledUserContainer>
        {!isUser ? (
          <Button
            type="button"
            height="4rem"
            textSize="1.65rem"
            width="8rem"
            borderRadius="1rem"
            onClick={() => setUser(true)}
          >
            로그인
          </Button>
        ) : (
          <>
            <Button
              backgroundColor="transparent"
              width="fit-content"
              type="button"
              onClick={() => setAlarm(true)}
            >
              <Icon
                isFill={false}
                name="notifications"
                style={styledUserIcon}
              />
              {alarm && <AlarmModal onChangeOpen={() => setAlarm(false)} />}
            </Button>
            <Link to="/directmessage">
              <Button
                backgroundColor="transparent"
                width="fit-content"
                type="button"
              >
                <Icon
                  isFill={false}
                  name="send"
                  style={styledUserIcon}
                />
              </Button>
            </Link>
            <Button
              backgroundColor="transparent"
              width="fit-content"
              type="button"
              borderRadius="0"
              onClick={() => alert('드롭다운')}
            >
              <Icon
                isFill={false}
                name="account_circle"
                style={styledUserIcon}
              />
            </Button>
          </>
        )}
      </StyledUserContainer>
    </StyledHeaderContainer>
  );
};

export default Header;
