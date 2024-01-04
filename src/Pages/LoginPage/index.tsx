import MoveToSignUpButton from '@/Components/Login/MoveToSignUpButton';
import { StyledWrap, StyledContainer } from './style';
import LoginForm from '@/Components/Login/LoginForm';
import Logo from '@/Components/Common/Logo';
import HistoryBackButton from '@/Components/Common/HistoryBackButton';

const LoginPage = () => {
  return (
    <StyledWrap>
      <StyledContainer>
        <HistoryBackButton className="history-back-button" />
        <Logo />
        <LoginForm />
        <MoveToSignUpButton />
      </StyledContainer>
    </StyledWrap>
  );
};

export default LoginPage;
