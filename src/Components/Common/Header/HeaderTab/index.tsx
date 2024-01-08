import { SetStateAction, useState } from 'react';
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
    console.log(text);
    if (
      text !== 'account_circle' &&
      text !== '마이페이지' &&
      text !== '로그아웃' &&
      text !== '비밀번호 변경'
    ) {
      setDrop(false);
    }
  });

  const navigate = useNavigate();

  const onSelectOption = (option: string) => {
    if (option === '마이페이지') {
      navigate('/profile');
      setPrev(tab);
      setTab('account');
      setDrop(false);
    }
    if (option === '로그아웃') {
      navigate('/');
      setTab('home');
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
          <LoginButton onClick={() => setIsAuthUser(true)} />
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
                setModalOpen={() => setDrop(!drop)}
              />
            ) : (
              <ModalButton
                name="account_circle"
                style={styledNavIcon}
                isFill={false}
                setModalOpen={() => {
                  onSetModal('account');
                  setDrop(!drop);
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
