import validateEmail from '@/Utils/validateEmail';
import { ValidateLoginProps } from './type';

const validateLogin = ({ email, password }: ValidateLoginProps) => {
  const validationErrors: Record<string, string> = {};

  if (typeof email === 'string' && !validateEmail(email)) {
    validationErrors.email = '유효하지 않은 이메일입니다.';
  }

  if (typeof password === 'string' && password.length < 8) {
    validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
  }

  return validationErrors;
};

export default validateLogin;
