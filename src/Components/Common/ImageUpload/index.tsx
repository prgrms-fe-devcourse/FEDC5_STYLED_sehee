import { ChangeEvent, MouseEvent, useMemo, useRef, useState } from 'react';
import Icon from '@/Components/Base/Icon';
import {
  StyledImage,
  StyledInput,
  StyledText,
  StyledWrapper,
  StyledUploadForm,
  StyledButton,
  IconStyle,
} from './style';
import { ImageFileType, ImageUploadProps } from './type';
import Button from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';

const ImageUpload = ({ width, height, fontSize }: ImageUploadProps) => {
  const uploadInput = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<ImageFileType | null>(null);

  /**
   * 파일 업로드 버튼 클릭 핸들러 함수
   * 다른 요소에서 클릭 이벤트에 매핑하면 파일 업로드 진행됨
   */
  const handleClickUpload = (e: MouseEvent) => {
    e.preventDefault();
    uploadInput.current?.click();
  };

  /**
   * 업로드 이미지 파일 상태로 저장하는 함수
   * 파일의 url을 URL.createObjectURL로 변환하여 저장
   */
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const ImageFileData = e.target.files;
    const isFileEmpty = ImageFileData?.length === 0;

    if (ImageFileData && !isFileEmpty) {
      const uploadImageUrl = URL.createObjectURL(ImageFileData[0]);

      setImageFile({
        file: ImageFileData[0],
        imageUrl: uploadImageUrl,
        type: ImageFileData[0].type.slice(0, 5),
      });
    }
  };

  /**
   * 업로드한 이미지가 있는지에 따라 업로드 폼과 이미지를 교체하는 함수
   * useMemo를 사용한 것은 이미지 업로드와 렌더링을 최적화하기 위함
   */
  const showUploadImage = useMemo(() => {
    return imageFile ? (
      <StyledImage
        src={imageFile.imageUrl}
        alt={imageFile.type}
        onClick={handleClickUpload}
      />
    ) : null;
  }, [imageFile]);

  return (
    <StyledWrapper
      $width={width}
      $height={height}
      $fontSize={fontSize}
    >
      {showUploadImage}
      <StyledUploadForm style={{ display: imageFile ? 'none' : 'flex' }}>
        <Icon
          name="add_a_photo"
          onClick={handleClickUpload}
          style={{ fontSize: fontSize && fontSize * 50, ...IconStyle }}
        />
        <StyledText>사진을 선택하여 추가해주세요.</StyledText>
        <Button onClick={handleClickUpload}>가져오기</Button>
        {/* <StyledButton onClick={handleClickUpload}>가져오기</StyledButton> */}
        <StyledInput
          type="file"
          accept="image/*"
          ref={uploadInput}
          onChange={uploadImage}
        />
      </StyledUploadForm>
    </StyledWrapper>
  );
};

export default ImageUpload;
