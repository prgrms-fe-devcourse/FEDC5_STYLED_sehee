import { useMutation } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useSessionStorage } from '@/Hooks';
import useAuthUserStore from '@/Stores/AuthUser';
import { AUTH_TOKEN_KEY } from '@/Constants/Api';

import Logo from '@/Components/Common/Logo';
import SignUpForm from '@/Components/SignUp/SignUpForm';
import Spinner from '@/Components/Base/Spinner';
import HistoryBackButton from '@/Components/Common/HistoryBackButton';
import { checkAuth } from '@/Services/Auth';

import { UserResponseType } from '@/Types/Response';
import Alert from '@/Components/Common/Alert';
import { StyledWrap, StyledContainer } from './style';

const SignUpPage = () => {
  const navigator = useNavigate();
  const { colors } = useTheme();
  const [, setSessionToken] = useSessionStorage(AUTH_TOKEN_KEY, '');
  const { setAuthUser } = useAuthUserStore();
  const [alertMessage, setAlertMessage] = useState('');

  const { mutate, status } = useMutation({
    mutationFn: checkAuth,
    onSuccess: (response) => {
      if (response) {
        setAuthUser(response);
        navigator('/');
      }
    },
  });

  const onSuccessCallback = useCallback(
    ({ token, user }: UserResponseType) => {
      setAuthUser(user);
      setSessionToken(token);
      navigator('/');
    },
    [navigator, setAuthUser, setSessionToken],
  );

  const onErrorCallback = useCallback((errorMessage: string) => {
    setAlertMessage(errorMessage);
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
          <SignUpForm
            onSuccessCallback={onSuccessCallback}
            onErrorCallback={onErrorCallback}
          />
        </StyledContainer>
      )}

      {alertMessage && (
        <Alert
          message={alertMessage}
          onChangeOpen={() => setAlertMessage('')}
        />
      )}
    </StyledWrap>
  );
};

export default SignUpPage;
