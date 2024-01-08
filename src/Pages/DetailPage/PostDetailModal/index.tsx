import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';
import {
  StyledImageCardContainer,
  StyledImage,
  modalStyle,
  StyledIcon,
} from './style';
import { PostDetailModalProps } from './type';

const PostDetailModal = ({ postImageUrl }: PostDetailModalProps) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

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
