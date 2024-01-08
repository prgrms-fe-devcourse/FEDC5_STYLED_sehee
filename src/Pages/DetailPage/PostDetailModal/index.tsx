import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostDetailModalProps } from './type';
import Modal from '@/Components/Common/Modal';
import {
  StyledImageCardContainer,
  StyledImage,
  modalStyle,
  StyledIcon,
} from './style';

const PostDetailModal = ({ postImageUrl }: PostDetailModalProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  /**
   * 모달 close 상태 변경 및 메인페이지 이동 함수
   * @param state isOpen 모달 open 여부 상태
   */
  const handleCloseModal = (state: boolean) => {
    navigate('/');
    setIsOpen(state);
  };
  return isOpen ? (
    <Modal
      style={modalStyle}
      onChangeOpen={handleCloseModal}
    >
      <StyledImageCardContainer>
        {postImageUrl && postImageUrl.length !== 0 ? (
          <StyledImage src={postImageUrl} />
        ) : (
          <StyledIcon src="src/Assets/Images/STYLED-logo-black.png" />
        )}
      </StyledImageCardContainer>
    </Modal>
  ) : null;
};

export default PostDetailModal;
