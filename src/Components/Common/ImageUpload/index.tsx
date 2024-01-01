import { useRef } from 'react';
import Icon from '@/Components/Base/Icon';
import { StyledInput, StyledText, StyledWrapper } from './style';
import Button from '@/Components/Base/Button';

const ImageUpload = () => {
  const uploadInput = useRef<HTMLInputElement>(null);

  return (
    <StyledWrapper>
      <Icon
        name="add_a_photo"
        onClick={() => console.log('icon 클릭')}
      />
      <StyledText>사진을 선택하여 추가해주세요.</StyledText>
      <Button onClickButton={() => console.log('button 클릭')}>가져오기</Button>
      <StyledInput
        type="file"
        accept="image/*"
        ref={uploadInput}
      />
    </StyledWrapper>
  );
};

export default ImageUpload;
