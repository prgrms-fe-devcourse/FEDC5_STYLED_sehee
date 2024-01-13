import { NameType } from './type';

const validateName = ({ username }: NameType) => {
  const validationErrors: Partial<NameType> = {};

  if (username && typeof username === 'string' && username.length > 16) {
    validationErrors.username = '유저명은 16자 이내로 작성해주세요.';
  }

  return validationErrors;
};

export default validateName;
