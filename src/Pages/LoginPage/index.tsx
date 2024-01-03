import MoveToSignUpButton from '@/Components/Login/MoveToSignUpButton';
import { StyledWrap, StyledContainer } from './style';
import LoginForm from '@/Components/Login/LoginForm';
import Logo from '@/Components/Common/Logo';
import HistoryBackButton from '@/Components/Login/HistoryBackButton';

const LoginPage = () => {
  return (
    <StyledWrap>
      <StyledContainer>
        <Logo />
        <LoginForm />
        <MoveToSignUpButton />
        <HistoryBackButton />
      </StyledContainer>
    </StyledWrap>
  );
};

export default LoginPage;
