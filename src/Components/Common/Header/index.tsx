import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Icon from '@/Components/Base/Icon';
import {
  StyledHeaderContainer,
  StyledLogo,
  StyledLogoContainer,
  StyledNavContainer,
  StyledUserContainer,
} from './style';
import Button from '@/Components/Base/Button';
import AlarmModal from '../Modal/AlarmModal';
import logoBlack from '@/Assets/Images/STYLED-logo-black.png';
import logoWhite from '@/Assets/Images/STYLED-logo-white.png';
import HeaderTab from './HeaderTab';

const Header = () => {
  const { colors } = useTheme();
  const [isUser, setUser] = useState(false);
  const [alarm, setAlarm] = useState(false);

  const styledUserIcon = { fontSize: '4rem', padding: '1rem' };

  /**
   * Todo
   * 1. nav 요소 토글
   * 3. 테마 적용 > 밑에 줄 색
   */

  return (
    <StyledHeaderContainer>
      <Link to="/">
        <StyledLogoContainer>
          <StyledLogo
            src={colors.background === '#000000' ? logoWhite : logoBlack}
            alt="logo"
          />
        </StyledLogoContainer>
      </Link>
      <StyledNavContainer>
        <HeaderTab />
      </StyledNavContainer>
      <StyledUserContainer>
        {!isUser ? ( // 추후 수정 필요
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
