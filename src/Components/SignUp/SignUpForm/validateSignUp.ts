import validateEmail from '@/Utils/validateEmail';
import ValidateSignUpProps from './type';

const validateSignUp = ({ username, email, password }: ValidateSignUpProps) => {
  const validationErrors: Record<string, string> = {};

  if (typeof username === 'string') {
    validationErrors.username = '이미 존재하는 유저명입니다.';
  }

  if (typeof email === 'string' && !validateEmail(email)) {
    validationErrors.email = '유효하지 않은 이메일입니다.';
  }

  if (typeof password === 'string' && password.length < 8) {
    validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
  }

  return validationErrors;
};

export default validateSignUp;
