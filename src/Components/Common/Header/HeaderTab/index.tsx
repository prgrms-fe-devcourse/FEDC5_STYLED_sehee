import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import LoginButton from './LoginButton';
import DropDown from '@/Components/Common/DropDown';
import StyledUserContainer from './style';
import LinkButton from './LinkButton';
import ModalButton from './ModalButton';
import AlarmModal from '../../Modal/AlarmModal';
import useClickAway from '@/Hooks/UseClickAway';
import { checkAuth, logout } from '@/Services/Auth';
import useTabStore from '@/Stores/Tab';

const HeaderTab = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { colors } = useTheme();

  // tab
  const { tab, prev, setTab, setPrev } = useTabStore();

  // tab이 변경될 때마다 sessionStorage에 저장
  useEffect(() => {
    if (
      tab === 'home' ||
      tab === 'message' ||
      (tab === 'account' && location.pathname.includes('/profile'))
    ) {
      setPrev(tab);
      sessionStorage.setItem('prev', prev);
    }
    sessionStorage.setItem('tab', tab);
  }, [tab, prev, setPrev, location]);

  const [alarm, setAlarm] = useState(false);

  const options = ['마이페이지', '로그아웃', '비밀번호 변경'];
  const [drop, setDrop] = useState(false);

  // 드롭다운 이외의 영역 클릭시 드롭다운 off
  const ref = useClickAway((e) => {
    const text = (e.target as HTMLLIElement).textContent;
    if (
      text !== 'account_circle' &&
      text !== '마이페이지' &&
      text !== '로그아웃' &&
      text !== '비밀번호 변경' &&
      drop
    ) {
      setDrop(false);
      setTab(prev);
    }
  });

  // 사용자 인증 확인
  const isAuthUser = !!sessionStorage.getItem('AUTH_TOKEN');

  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
  });

  // useMutation으로 로그아웃 처리
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // 로그아웃 성공 시
      queryClient.setQueryData(['auth'], null);
      sessionStorage.removeItem('AUTH_TOKEN');
      navigate('/');
      setTab('home');
    },
  });

  const onSelectOption = (option: string) => {
    if (option === '마이페이지') {
      setDrop(!drop);
      // eslint-disable-next-line no-underscore-dangle
      navigate(`/profile/${data?._id}`);
      setPrev('account');
    }
    if (option === '로그아웃') {
      setDrop(!drop);
      mutate();
    }
    if (option === '비밀번호 변경') {
      setDrop(!drop);
      // eslint-disable-next-line no-underscore-dangle
      navigate(`/edit-password/${data?._id}`);
    }
  };

  const onSetModal = (
    option: 'home' | 'add' | 'search' | 'alarm' | 'message' | 'account',
  ) => {
    if (
      tab === 'home' ||
      tab === 'message' ||
      (tab === 'account' && location.pathname === '/profile')
    ) {
      setPrev(tab);
    }
    setTab(option);
  };

  const styledNavIcon = { fontSize: '4.5rem', padding: '1.5rem' };

  return (
    <>
      <StyledUserContainer>
        <LinkButton
          name="home"
          color={tab === 'home' ? colors.primary : colors.background}
          link="/"
          setLink={() => setTab('home')}
          style={styledNavIcon}
        />

        <LinkButton
          name="add_circle"
          color={tab === 'add' ? colors.primary : colors.background}
          link={`${
            location.pathname !== '/' ? location.pathname : ''
          }/add-post`}
          setLink={() => setTab('add')}
          style={styledNavIcon}
        />

        <LinkButton
          name="search"
          color={tab === 'search' ? colors.primary : colors.background}
          link={`${location.pathname !== '/' ? location.pathname : ''}/search`}
          setLink={() => setTab('search')}
          style={styledNavIcon}
        />
        {!isAuthUser ? (
          <LoginButton onClick={() => navigate('/login')} />
        ) : (
          <>
            <ModalButton
              name="notifications"
              style={styledNavIcon}
              color={tab === 'alarm' ? colors.primary : colors.background}
              setModalOpen={() => {
                onSetModal('alarm');
                setAlarm(true);
              }}
            />

            <LinkButton
              name="send"
              color={tab === 'message' ? colors.primary : colors.background}
              link="/directmessage"
              setLink={() => setTab('message')}
              style={styledNavIcon}
            />
            <ModalButton
              name="account_circle"
              style={styledNavIcon}
              color={tab === 'account' ? colors.primary : colors.background}
              setModalOpen={() => {
                onSetModal('account');
                setDrop(!drop);
              }}
            />
          </>
        )}
      </StyledUserContainer>
      {alarm && (
        <AlarmModal
          onChangeOpen={() => {
            setAlarm(false);
            setTab(prev);
          }}
        />
      )}
      <DropDown
        ref={ref}
        isShow={drop}
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
    </>
  );
};

export default HeaderTab;
