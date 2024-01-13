import { Passwordtype } from './type';

const validatePassword = ({ newPassword, verifyPassword }: Passwordtype) => {
  const validationErrors: Partial<Passwordtype> = {};

  if (
    newPassword &&
    typeof newPassword === 'string' &&
    newPassword.length < 8
  ) {
    validationErrors.newPassword = '비밀번호는 최소 8자 이상이어야 합니다.';
  }
  if (
    verifyPassword &&
    typeof verifyPassword === 'string' &&
    verifyPassword !== newPassword
  ) {
    validationErrors.verifyPassword = '비밀번호가 일치하지 않습니다.';
  }

  return validationErrors;
};

export default validatePassword;
