const validateSearchUser = ({ userName }: { userName: string }) => {
  const errors: Partial<{ userName: string }> = {};

  if (!userName) {
    errors.userName = '사용자를 입력해주세요';
  }

  return errors;
};

export default validateSearchUser;
