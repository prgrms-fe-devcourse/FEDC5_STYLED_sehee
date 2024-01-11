import { useState } from 'react';
import { Props } from './type';
import AsideHeader from './AsideHeader';
import TitleEditor from './TitleEditor';
import Modal from '..';
import ImageUpload from '../../ImageUpload';
import { StyledAside, StyledHeader, StyledMain, StyledWrapper } from './style';
import { ImageFileType } from '../../ImageUpload/type';

// * 하위 컴포넌트로부터 갱신된 데이터를 통합적으로 관리

// DONE: 컴포넌트 설계
// DONE: Props 설정, 타입 지정
// DONE: 대략적인 스타일링
// TODO: 컴포넌트 구현
// TODO: 해당 컴포넌트로 데이터를 모아 쿼리 통신 구현
// TODO: 기타 에러 핸들링
// TODO: 게시글 수정 모달로 확장

const CreatePostModal = ({ post, onChangeOpen }: Props) => {
  // TODO: post 있는 상태면 해당 값으로 초기화, 아니면 빈 값으로
  const [category, setCategory] = useState<string>();
  const [title, setTitle] = useState<string>();

  const handleImageUpload = (imageFile: ImageFileType | null) => {
    console.log(imageFile);
  };
  const handleSubmit = () => {};

  return (
    <Modal onChangeOpen={onChangeOpen}>
      <StyledWrapper>
        <StyledMain>
          <StyledHeader>새로운 포스트</StyledHeader>
          <ImageUpload
            width="100%"
            height="100%"
            onUpload={handleImageUpload}
          />
        </StyledMain>
        <StyledAside>
          <AsideHeader
            onSubmit={handleSubmit}
            onSelectChannelId={setCategory}
          />
          <TitleEditor onEditing={setTitle} />
        </StyledAside>
      </StyledWrapper>
    </Modal>
  );
};

export default CreatePostModal;
