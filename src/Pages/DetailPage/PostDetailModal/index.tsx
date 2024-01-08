import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { PostDetailModalProps } from './type';
import Modal from '@/Components/Common/Modal';
import {
  StyledImageCardContainer,
  StyledImage,
  StyledIcon,
  StyledPostContentContainer,
  StyledAuthorInfo,
  StyledPostMainInfo,
  StyledLikeCommentChat,
} from './style';
import UserCard from '@/Components/Common/UserCard';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import PostDotModal from './PostDotModal';

const PostDetailModal = ({
  postImageUrl,
  postAuthor,
  authorAvatar,
}: PostDetailModalProps) => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const [isPostDetailModalOpen, setIsPostDetailModalOpen] = useState(true);
  const [isDotModalOpen, setIsDotModalOpen] = useState(false);

  /**
   * 모달 close 상태 변경 및 메인페이지 이동 함수
   * @param state isOpen 모달 open 여부 상태
   */
  const handleCloseModal = (state: boolean) => {
    navigate('/');
    setIsPostDetailModalOpen(state);
  };

  const handleCloseDotModal = (state: boolean) => {
    setIsDotModalOpen(state);
  };

  return isPostDetailModalOpen ? (
    <>
      <Modal
        width={70}
        height={70}
        onChangeOpen={handleCloseModal}
      >
        <StyledImageCardContainer>
          {postImageUrl && postImageUrl.length !== 0 ? (
            <StyledImage src={postImageUrl} />
          ) : (
            <StyledIcon src="src/Assets/Images/STYLED-logo-black.png" />
          )}
        </StyledImageCardContainer>
        <StyledPostContentContainer>
          <StyledAuthorInfo>
            <UserCard
              width="70%"
              mode="follow"
              badgeSize="0"
              userName={postAuthor}
              coverImageUrl={authorAvatar}
              // Todo: 팔로우 여부 추가
              className="post-detail-user-card"
            />
            <Button
              width="3rem"
              height="3rem"
              borderRadius="0.5rem"
              backgroundColor={colors.background}
              onClick={() => setIsDotModalOpen(true)}
            >
              <Icon name="more_horiz" />
            </Button>
          </StyledAuthorInfo>
          <StyledPostMainInfo />
          <StyledLikeCommentChat />
        </StyledPostContentContainer>
      </Modal>
      {isDotModalOpen && (
        <PostDotModal
          onChangeOpen={handleCloseDotModal}
          onCloseDotModal={handleCloseDotModal}
        />
      )}
    </>
  ) : null;
};

export default PostDetailModal;
