import { StyledWrap, StyledContainer } from './style';
import Logo from '@/Components/Common/Logo';
import HistoryBackButton from '@/Components/Common/HistoryBackButton';
import SignUpForm from '@/Components/SignUp/LoginForm';

const SignUpPage = () => {
  return (
    <StyledWrap>
      <StyledContainer>
        <HistoryBackButton className="history-back-button" />
        <Logo />
        <SignUpForm />
      </StyledContainer>
    </StyledWrap>
  );
};

export default SignUpPage;
