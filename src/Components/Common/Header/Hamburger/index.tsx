import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTheme } from 'styled-components';
import StyledWrapper from './style';

import DropDownOnlyOption from '../../DropDownOnlyOption';
import useTabStore from '@/Stores/Tab';
import useClickAway from '@/Hooks/UseClickAway';
import ModalButton from '../HeaderTab/ModalButton';
import { checkAuth, logout } from '@/Services/Auth';
import NotificationModal from '@/Components/NotificationModal';
import { useDarkModeStore } from '@/Stores';

const Hamburger = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { colors } = useTheme();

  const [isDrop, setIsDrop] = useState<boolean>(false);
  const { tab, prev, setTab, setPrev } = useTabStore();
  const [alarm, setAlarm] = useState(false);

  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
  const isAuthUser = !!sessionStorage.getItem('AUTH_TOKEN');
  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuth,
  });

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

  const styledNavIcon = {
    fontSize: '3.2rem',
    color: colors.text,
    fontWeight: '300',
  };

  const { mutate: mutateLogout } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      // 로그아웃 성공 시
      queryClient.setQueryData(['auth'], null);
      sessionStorage.removeItem('AUTH_TOKEN');
      navigate('/');
      setTab('home');
    },
  });

  const options: string[] = isAuthUser
    ? [
        '홈',
        '포스트 작성',
        '검색',
        '알림',
        '메시지',
        '마이페이지',
        '비밀번호 변경',
        '로그아웃',
        isDarkMode ? '🌞 라이트모드' : '🌝 다크모드',
      ]
    : [
        '홈',
        '포스트 작성',
        '검색',
        '로그인',
        isDarkMode ? '🌞 라이트모드' : '🌝 다크모드',
      ];

  const onSelectOption = (option: string) => {
    setIsDrop(!isDrop);

    switch (option) {
      case '홈':
        navigate('/');
        break;
      case '포스트 작성':
        navigate(
          `${location.pathname !== '/' ? location.pathname : ''}/add-post`,
        );
        break;
      case '검색':
        navigate(
          `${location.pathname !== '/' ? location.pathname : ''}/search`,
        );
        break;
      case '알림':
        setAlarm((prevIsShow) => !prevIsShow);
        break;
      case '메시지':
        navigate('/directmessage');
        break;
      case '로그인':
        navigate('/login');
        break;
      case '마이페이지':
        // eslint-disable-next-line no-underscore-dangle
        navigate(`/profile/${data?._id}`);
        setPrev('account');
        break;
      case '비밀번호 변경':
        navigate(
          `${
            location.pathname !== '/' ? location.pathname : ''
            // eslint-disable-next-line no-underscore-dangle
          }/edit-password/${data?._id}`,
        );
        break;
      case '로그아웃':
        mutateLogout();
        break;
      case '🌞 라이트모드':
        toggleDarkMode();
        break;
      case '🌝 다크모드':
        toggleDarkMode();
        break;
      default:
        break;
    }
  };

  const ref = useClickAway(() => {
    setIsDrop(false);
    setTab(prev);
  });

  return (
    <>
      {' '}
      <StyledWrapper>
        <ModalButton
          name="menu"
          style={styledNavIcon}
          color={
            tab === 'account' ? colors.primaryReverse : colors.primaryNormal
          }
          setModalOpen={() => setIsDrop(!isDrop)}
        />
        <DropDownOnlyOption
          ref={ref}
          isShow={isDrop}
          options={options}
          onSelect={(option) => {
            onSelectOption(option);
          }}
          inset="5rem 0rem 0rem -12rem"
        />
      </StyledWrapper>
      {alarm && (
        <NotificationModal
          onClose={() => {
            setAlarm(false);
            setTab(prev);
          }}
        />
      )}
    </>
  );
};

export default Hamburger;
