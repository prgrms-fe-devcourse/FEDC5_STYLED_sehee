import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import MoveToSignUpButton from '@/Components/Login/MoveToSignUpButton';
import { StyledWrap, StyledContainer } from './style';
import LoginForm from '@/Components/Login/LoginForm';
import Logo from '@/Components/Common/Logo';
import HistoryBackButton from '@/Components/Common/HistoryBackButton';
import { checkAuth } from '@/Services/Auth';
import Spinner from '@/Components/Base/Spinner';
import { UserResponseType } from '@/Types/Response';
import useAuthUserStore from '@/Stores/AuthUser';
import { useSessionStorage } from '@/Hooks';
import { AUTH_TOKEN_KEY } from '@/Constants/Api';
import Alert from '@/Components/Common/Alert';

const LoginPage = () => {
  const navigator = useNavigate();
  const { colors } = useTheme();
  const [, setSessionToken] = useSessionStorage(AUTH_TOKEN_KEY, '');
  const { setAuthUser } = useAuthUserStore();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  // 인증 되었으면 접근 불가 처리
  const { mutate, status } = useMutation({
    mutationFn: checkAuth,
    onSuccess: (response) => response && navigator('/'),
  });

  const onSuccessCallback = useCallback(
    ({ token, user }: UserResponseType) => {
      setAuthUser(user);
      setSessionToken(token);
      navigator('/');
    },
    [navigator, setAuthUser, setSessionToken],
  );

  const onErrorCallback = useCallback(() => {
    setLoginErrorMessage('로그인 실패');
  }, []);

  useEffect(() => {
    mutate();
  }, [mutate]);

  return (
    <StyledWrap>
      {status !== 'success' ? (
        <Spinner color={colors.primary} />
      ) : (
        <StyledContainer>
          <HistoryBackButton className="history-back-button" />
          <Logo />
          <LoginForm
            onSuccessCallback={onSuccessCallback}
            onErrorCallback={onErrorCallback}
          />
          <MoveToSignUpButton />
        </StyledContainer>
      )}

      {loginErrorMessage && (
        <Alert
          message={loginErrorMessage}
          onChangeOpen={() => setLoginErrorMessage('')}
        />
      )}
    </StyledWrap>
  );
};

export default LoginPage;
