import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import LoginButton from './LoginButton';
import {
  StyledUserContainer,
  StyledButtonContainer,
  StyledFocusedCircle,
} from './style';
import LinkButton from './LinkButton';
import ModalButton from './ModalButton';
import useClickAway from '@/Hooks/UseClickAway';
import { checkAuth, logout } from '@/Services/Auth';
import useTabStore from '@/Stores/Tab';

import NotificationModal from '@/Components/NotificationModal';
import QUERY_KEYS from '@/Constants/queryKeys';
import { getNotifications } from '@/Services/Notification';
import useAuthUserStore from '@/Stores/AuthUser';
import Badge from '@/Components/Base/Badge';
import filterNotificationLength from './filterNotificationLength';
import DropDownOnlyOption from '../../DropDownOnlyOption';

const HeaderTab = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  const { size, colors } = useTheme();
  const {
    user: { _id: userId },
  } = useAuthUserStore();
  const refetchTime = 2000;

  // tab
  const { tab, prev, setTab, setPrev } = useTabStore();

  const { data: notificationLength } = useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATION_LIST],
    queryFn: getNotifications,
    refetchInterval: refetchTime,
    enabled: !!userId && document.visibilityState === 'visible',
    select: (notifications) => filterNotificationLength(notifications || []),
  });

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
      navigate(
        `${
          location.pathname !== '/' ? location.pathname : ''
          // eslint-disable-next-line no-underscore-dangle
        }/edit-password/${data?._id}`,
      );
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

  const styledNavIcon = {
    fontSize: '3.2rem',
    color: colors.text,
    fontWeight: '300',
  };

  return (
    <>
      <StyledUserContainer>
        <StyledButtonContainer>
          <LinkButton
            name="home"
            color={
              tab === 'home' ? colors.primaryReverse : colors.primaryNormal
            }
            link="/"
            setLink={() => setTab('home')}
            style={styledNavIcon}
          />
          <StyledFocusedCircle $visible={tab === 'home'} />
        </StyledButtonContainer>

        <StyledButtonContainer>
          <LinkButton
            name="add_circle"
            color={tab === 'add' ? colors.primaryReverse : colors.primaryNormal}
            link={`${
              location.pathname !== '/' ? location.pathname : ''
            }/add-post`}
            setLink={() => setTab('add')}
            style={styledNavIcon}
          />
          <StyledFocusedCircle $visible={tab === 'add'} />
        </StyledButtonContainer>

        <StyledButtonContainer>
          <LinkButton
            name="search"
            color={
              tab === 'search' ? colors.primaryReverse : colors.primaryNormal
            }
            link={`${
              location.pathname !== '/' ? location.pathname : ''
            }/search`}
            setLink={() => setTab('search')}
            style={styledNavIcon}
          />
          <StyledFocusedCircle $visible={tab === 'search'} />
        </StyledButtonContainer>

        {!isAuthUser ? (
          <LoginButton />
        ) : (
          <>
            <StyledButtonContainer>
              <ModalButton
                name="notifications"
                style={styledNavIcon}
                color={
                  tab === 'alarm' ? colors.primaryReverse : colors.primaryNormal
                }
                setModalOpen={() => {
                  onSetModal('alarm');
                  setAlarm(true);
                }}
              >
                {notificationLength && notificationLength > 0 ? (
                  <Badge
                    position="rightTop"
                    backgroundColor={colors.alert}
                    textColor="white"
                    textSize={size.medium}
                    size={size.large}
                    style={{ border: `2px solid ${colors.background}` }}
                  >
                    {notificationLength}
                  </Badge>
                ) : null}
              </ModalButton>

              <StyledFocusedCircle $visible={tab === 'alarm'} />
            </StyledButtonContainer>

            <StyledButtonContainer>
              <LinkButton
                name="send"
                color={
                  tab === 'message'
                    ? colors.primaryReverse
                    : colors.primaryNormal
                }
                link="/directmessage"
                setLink={() => setTab('message')}
                style={styledNavIcon}
              />
              <StyledFocusedCircle $visible={tab === 'message'} />
            </StyledButtonContainer>

            <StyledButtonContainer>
              <ModalButton
                name="account_circle"
                style={styledNavIcon}
                color={
                  tab === 'account'
                    ? colors.primaryReverse
                    : colors.primaryNormal
                }
                setModalOpen={() => {
                  onSetModal('account');
                  setDrop(!drop);
                }}
              />
              <DropDownOnlyOption
                ref={ref}
                isShow={drop}
                options={options}
                onSelect={(option) => {
                  onSelectOption(option);
                }}
                // style={{ right: '16rem', top: '5rem' }}
              />
              <StyledFocusedCircle $visible={tab === 'account'} />
            </StyledButtonContainer>
          </>
        )}
      </StyledUserContainer>
      {alarm && (
        <NotificationModal
          onClose={() => {
            setTab(prev);
            setAlarm(false);
          }}
        />
      )}
    </>
  );
};

export default HeaderTab;
