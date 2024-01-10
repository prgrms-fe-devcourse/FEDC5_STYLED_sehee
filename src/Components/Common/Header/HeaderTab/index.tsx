import { SetStateAction, useEffect, useState } from 'react';
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

const HeaderTab = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { colors } = useTheme();

  // 새로고침 시에도 tab 유지되게
  const storedTab: string | null = sessionStorage.getItem('tab');
  const initialTab:
    | 'home'
    | 'add'
    | 'search'
    | 'alarm'
    | 'message'
    | 'account' = storedTab || 'home';

  // tab 상태와 이를 변경하는 함수
  const [tab, setTab] = useState<
    'home' | 'add' | 'search' | 'alarm' | 'message' | 'account'
  >(initialTab);
  const [prev, setPrev] = useState(tab);

  // tab이 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (
      tab === 'home' ||
      tab === 'message' ||
      (tab === 'account' && location.pathname === '/profile')
    ) {
      sessionStorage.setItem('tab', tab);
    }
    sessionStorage.setItem('prev', prev);
  }, [tab, prev, location]);

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
      setPrev(tab);
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
    option: SetStateAction<
      'home' | 'add' | 'search' | 'alarm' | 'message' | 'account'
    >,
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
        {tab === 'home' ? (
          <LinkButton
            name="home"
            color={colors.primary}
            link="/"
            style={styledNavIcon}
          />
        ) : (
          <LinkButton
            name="home"
            color={colors.background}
            link="/"
            setLink={() => setTab('home')}
            style={styledNavIcon}
          />
        )}
        {tab === 'add' ? (
          <LinkButton
            name="add_circle"
            color={colors.primary}
            link="/add-post"
            style={styledNavIcon}
          />
        ) : (
          <LinkButton
            name="add_circle"
            color={colors.background}
            link="/add-post"
            setLink={() => setTab('add')}
            style={styledNavIcon}
          />
        )}
        {tab === 'search' ? (
          <LinkButton
            name="search"
            color={colors.primary}
            link="/search"
            style={styledNavIcon}
          />
        ) : (
          <LinkButton
            name="search"
            color={colors.background}
            link="/search"
            setLink={() => setTab('search')}
            style={styledNavIcon}
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
                color={colors.primary}
              />
            ) : (
              <ModalButton
                name="notifications"
                style={styledNavIcon}
                color={colors.background}
                setModalOpen={() => {
                  onSetModal('alarm');
                  setAlarm(true);
                }}
              />
            )}
            {tab === 'message' ? (
              <LinkButton
                name="send"
                color={colors.primary}
                link="/directmessage"
                style={styledNavIcon}
              />
            ) : (
              <LinkButton
                name="send"
                color={colors.background}
                link="/directmessage"
                setLink={() => setTab('message')}
                style={styledNavIcon}
              />
            )}
            {tab === 'account' ? (
              <ModalButton
                name="account_circle"
                style={styledNavIcon}
                color={colors.primary}
                setModalOpen={() => {
                  setDrop(!drop);
                  setTab(prev);
                }}
              />
            ) : (
              <ModalButton
                name="account_circle"
                style={styledNavIcon}
                color={colors.background}
                setModalOpen={() => {
                  onSetModal('account');
                  setDrop(!drop);
                }}
              />
            )}
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
