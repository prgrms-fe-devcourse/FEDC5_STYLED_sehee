/* eslint-disable no-underscore-dangle */
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
  StyledPostContent,
  StyledEditTime,
  StyledPostMainTopContainer,
  StyledCommentHistory,
  StyledComment,
  StyledText,
  StyledLikeText,
  StyledButtonContainer,
  StledLikeContainer,
  StyledCommentContainer,
} from './style';
import UserCard from '@/Components/Common/UserCard';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import PostDotModal from './PostDotModal';

const PostDetailModal = ({
  postLike,
  postComment,
  postContents,
  postImageUrl,
  postAuthor,
  authorAvatar,
  postEditTime,
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
              width="fit-content"
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
          <StyledPostMainInfo>
            <StyledPostMainTopContainer>
              <UserCard
                width="fit-content"
                badgeSize="0"
                userName={postAuthor}
                coverImageUrl={authorAvatar}
                className="post-detail-user-card"
              />
              <StyledEditTime>{postEditTime}</StyledEditTime>
            </StyledPostMainTopContainer>
            <StyledPostContent>{postContents}</StyledPostContent>
            <StyledCommentHistory>
              댓글
              {postComment &&
                postComment.map(
                  ({ author, _id, comment, createdAt, updatedAt }) => (
                    <StyledComment key={_id}>
                      <UserCard
                        width="fit-content"
                        badgeSize="0"
                        userName={author.fullName}
                        coverImageUrl=""
                        userDetail={
                          createdAt === updatedAt ? createdAt : updatedAt
                        }
                        className="post-detail-user-card"
                      />
                      <StyledText>{comment}</StyledText>
                    </StyledComment>
                  ),
                )}
            </StyledCommentHistory>
          </StyledPostMainInfo>
          <StyledLikeCommentChat>
            <StyledButtonContainer>
              <Button
                width="2rem"
                height="2rem"
                borderRadius="0"
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.background}
              >
                <Icon
                  isFill={false}
                  name="favorite"
                  className="post-detail-modal-heart-btn"
                />
              </Button>
              <Button
                width="2rem"
                height="2rem"
                borderRadius="0"
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.background}
              >
                <Icon
                  isFill={false}
                  name="maps_ugc"
                  className="post-detail-modal-btn"
                />
              </Button>
              <Button
                width="2rem"
                height="2rem"
                borderRadius="0"
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.background}
              >
                <Icon
                  isFill={false}
                  name="question_answer"
                  className="post-detail-modal-btn"
                />
              </Button>
            </StyledButtonContainer>
            <StledLikeContainer>
              <UserCard
                width="fit-content"
                badgeSize="0"
                userName={
                  postLike && postLike.length !== 0 ? postLike[0]._id : ''
                }
                coverImageUrl=""
                userDetail=""
                className="post-detail-user-card"
              />
              <StyledLikeText>님</StyledLikeText>
              <StyledLikeText className="like-extra-text">{`외 ${postLike?.length}명`}</StyledLikeText>
              <StyledLikeText>이 좋아합니다.</StyledLikeText>
            </StledLikeContainer>
            <StyledCommentContainer />
          </StyledLikeCommentChat>
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
