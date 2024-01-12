import { PostFieldProps } from './type';

const validatePostFieldProps = ({ title, category, image }: PostFieldProps) => {
  if (title.length === 0) {
    return '내용을 입력해주세요.';
  }

  if (!category) {
    return '카테고리를 선택해주세요.';
  }

  if (!image) {
    return '이미지를 업로드해주세요.';
  }

  return null;
};

export default validatePostFieldProps;
