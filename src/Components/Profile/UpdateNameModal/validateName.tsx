import { NameType } from './type';

const validateName = ({ newName }: NameType) => {
  const validationErrors: Partial<NameType> = {};

  if (newName && typeof newName === 'string' && newName.length > 16) {
    validationErrors.newName = '유저명은 16자 이내로 작성해주세요.';
  }

  return validationErrors;
};

export default validateName;
