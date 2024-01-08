import { SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import DropDown from '@/Components/Common/DropDown';
import StyledUserContainer from './style';
import LinkButton from './LinkButton';
import PostModal from '../../Modal/PostModal';
import ModalButton from './ModalButton';
import AlarmModal from '../../Modal/AlarmModal';
import SearchModal from '../../Modal/SearchModal';
import PasswordModal from '../../Modal/PasswordModal';
import useClickAway from '@/Hooks/UseClickAway';
import { checkAuth, logout } from '@/Services/Auth';

const HeaderTab = () => {
  // 현재 페이지 가져오기

  const [tab, setTab] = useState<
    'home' | 'add' | 'search' | 'alarm' | 'message' | 'account'
  >('home');
  const [prev, setPrev] = useState(tab);
  const [isAuthUser, setIsAuthUser] = useState(false);

  const [post, setPost] = useState(false);
  const [search, setSearch] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [password, setPassword] = useState(false);

  const options = ['마이페이지', '로그아웃', '비밀번호 변경'];
  const [drop, setDrop] = useState(false);

  const ref = useClickAway((e) => {
    const text = (e.target as HTMLLIElement).textContent;
    console.log(e.target);
    console.log(text);
    if (
      text !== 'account_circle' &&
      text !== '마이페이지' &&
      text !== '로그아웃' &&
      text !== '비밀번호 변경'
    ) {
      setDrop(false);
      setTab(prev);
    }
  });

  const navigate = useNavigate();

  // 로그인 상태 확인 함수
  const checkLoginStatus = async () => {
    try {
      // 서버에 인증 여부 확인
      const authData = await checkAuth();

      // 로그인 상태인 경우
      if (authData) {
        // 로그인 상태로 업데이트
        setIsAuthUser(true);
      } else {
        // 로그아웃 상태로 업데이트
        setIsAuthUser(false);
      }
    } catch (error) {
      console.error('로그인 상태 확인 중 오류 발생:', error);
    }
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // 세션 스토리지에서 토큰 삭제
      sessionStorage.removeItem('AUTH_TOKEN');

      // 로그아웃 상태로 업데이트
      setIsAuthUser(false);
      setTab('home');
      navigate('/');

      // 실제 로그아웃 처리
      await logout();
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const onSelectOption = (option: string) => {
    if (option === '마이페이지') {
      navigate('/profile');
      setPrev(tab);
      setTab('account');
      setDrop(false);
    }
    if (option === '로그아웃') {
      handleLogout();
      setDrop(false);
    }
    if (option === '비밀번호 변경') {
      setPassword(true);
      setDrop(false);
    }
  };

  const onSetModal = (
    option: SetStateAction<
      'home' | 'add' | 'search' | 'alarm' | 'message' | 'account'
    >,
  ) => {
    if (tab === 'home' || tab === 'message') {
      setPrev(tab);
    }
    setTab(option);
  };

  const styledNavIcon = { fontSize: '4.5rem', padding: '1.5rem' };

  return (
    <>
      <StyledUserContainer>
        {tab === 'home' ? (
          <LinkButton
            name="home"
            isFill
            link="/"
            style={styledNavIcon}
          />
        ) : (
          <LinkButton
            name="home"
            isFill={false}
            link="/"
            setLink={() => setTab('home')}
            style={styledNavIcon}
          />
        )}
        {tab === 'add' ? (
          <ModalButton
            name="add_circle"
            style={styledNavIcon}
            isFill
          />
        ) : (
          <ModalButton
            name="add_circle"
            style={styledNavIcon}
            isFill={false}
            setModalOpen={() => {
              onSetModal('add');
              setPost(true);
            }}
          />
        )}
        {tab === 'search' ? (
          <ModalButton
            name="search"
            style={styledNavIcon}
            isFill
          />
        ) : (
          <ModalButton
            name="search"
            style={styledNavIcon}
            isFill={false}
            setModalOpen={() => {
              onSetModal('search');
              setSearch(true);
            }}
          />
        )}
        {!isAuthUser ? (
          <LoginButton onClick={() => navigate('/login')} />
        ) : (
          <>
            {tab === 'alarm' ? (
              <ModalButton
                name="notifications"
                style={styledNavIcon}
                isFill
              />
            ) : (
              <ModalButton
                name="notifications"
                style={styledNavIcon}
                isFill={false}
                setModalOpen={() => {
                  onSetModal('alarm');
                  setAlarm(true);
                }}
              />
            )}
            {tab === 'message' ? (
              <LinkButton
                name="send"
                isFill
                link="/directmessage"
                style={styledNavIcon}
              />
            ) : (
              <LinkButton
                name="send"
                isFill={false}
                link="/directmessage"
                setLink={() => setTab('message')}
                style={styledNavIcon}
              />
            )}
            {tab === 'account' ? (
              <ModalButton
                name="account_circle"
                style={styledNavIcon}
                isFill
                setModalOpen={() => {
                  setDrop(false);
                  setTab(prev);
                }}
              />
            ) : (
              <ModalButton
                name="account_circle"
                style={styledNavIcon}
                isFill={false}
                setModalOpen={() => {
                  onSetModal('account');
                  setDrop(true);
                }}
              />
            )}
          </>
        )}
      </StyledUserContainer>

      {post && (
        <PostModal
          onChangeOpen={() => {
            setPost(false);
            setTab(prev);
          }}
        />
      )}
      {alarm && (
        <AlarmModal
          onChangeOpen={() => {
            setAlarm(false);
            setTab(prev);
          }}
        />
      )}
      {search && (
        <SearchModal
          onChangeOpen={() => {
            setSearch(false);
            setTab(prev);
          }}
        />
      )}
      {drop && (
        <DropDown
          ref={ref}
          style={{
            position: 'absolute',
            right: '0',
            top: '10rem',
          }}
          options={options}
          onSelect={(option) => {
            onSelectOption(option);
          }}
        />
      )}
      {password && (
        <PasswordModal
          onChangeOpen={() => {
            setPassword(false);
            setTab(prev);
          }}
        />
      )}
    </>
  );
};

export default HeaderTab;
