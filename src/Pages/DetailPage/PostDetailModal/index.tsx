/* eslint-disable no-underscore-dangle */
import { useCallback, useRef, useState } from 'react';
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
  postCommentBtnStyle,
} from './style';
import UserCard from '@/Components/Common/UserCard';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import PostDotModal from './PostDotModal';
import Input from '@/Components/Base/Input';

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

  const commentInputRef = useRef<HTMLInputElement>(null);

  const [isPostDetailModalOpen, setIsPostDetailModalOpen] = useState(true);
  const [isDotModalOpen, setIsDotModalOpen] = useState(false);
  const [isCommentBtnDisabled, setIsCommentBtnDisabled] = useState(true);
  // TODO: 좋아요 연동 초기값
  const [isLike, setIsLike] = useState(false);

  /**
   * 댓글 입력 창이 비었을 경우 게시 버튼 비활성화하는 함수
   */
  const handleChangeCommentInput = useCallback(() => {
    const isInputEmpty = commentInputRef.current?.value !== '';
    setIsCommentBtnDisabled(!isInputEmpty);
  }, []);

  /**
   * 모달 close 상태 변경 및 메인페이지 이동 함수
   * @param state isOpen 모달 open 여부 상태
   */
  const handleCloseModal = (state: boolean) => {
    navigate('/');
    setIsPostDetailModalOpen(state);
  };

  /**
   * 점 세개 추가 모달 닫는 함수
   * @param state 점세개 추가 모달 open 여부 상태
   */
  const handleCloseDotModal = (state: boolean) => {
    setIsDotModalOpen(state);
  };

  /**
   * 좋아요 버튼 클릭 동작 함수
   */
  const handleClickLikeBtn = () => {
    // TODO: 좋아요 api 추가
    setIsLike(!isLike);
  };

  /**
   * DM 버튼 클릭 동작 함수
   */
  const handleClickDMBtn = () => {
    // TODO: DM 페이지 라우팅 연결
  };

  /**
   * 댓글 게시하는 함수
   */
  const handleClickComment = () => {
    // TODO: 댓글 게시 api 연결
  };

  return isPostDetailModalOpen ? (
    <>
      <Modal
        width={70}
        height={70}
        onChangeOpen={handleCloseModal}
      >
        {/* 왼쪽 사진 이미지 영역 */}
        <StyledImageCardContainer>
          {postImageUrl && postImageUrl.length !== 0 ? (
            <StyledImage src={postImageUrl} />
          ) : (
            <StyledIcon src="src/Assets/Images/STYLED-logo-black.png" />
          )}
        </StyledImageCardContainer>
        {/* 오른쪽 포스트 관련 정보 영역 */}
        <StyledPostContentContainer>
          <StyledAuthorInfo>
            {/* author 정보 및 팔로우 버튼 */}
            {/*  TODO: 유저 이름 클릭 시 유저 페이지 이동 구현 */}
            <UserCard
              width="fit-content"
              mode="follow"
              badgeSize="0"
              userName={postAuthor}
              coverImageUrl={authorAvatar}
              // Todo: 팔로우 여부 추가
              className="post-detail-user-card"
            />
            {/* 점 세개 추가 모달 버튼 */}
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
            {/* 포스트 author 및 상세 내용, 게시 시간 정보 */}
            <StyledPostMainTopContainer>
              <UserCard
                width="fit-content"
                badgeSize="0"
                userName={postAuthor}
                coverImageUrl={authorAvatar}
                className="post-detail-user-card"
              />
              {/* TODO: 경과 시간 계산 구현 */}
              <StyledEditTime>{postEditTime}</StyledEditTime>
            </StyledPostMainTopContainer>
            {/* TODO: 내용 많을 시 말줄임표 및 클릭 시 말줄임표 해제 */}
            <StyledPostContent>{postContents}</StyledPostContent>
            {/* 포스트 댓글 영역 */}
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
          {/* 좋아요, 댓글, DM 버튼 영역 */}
          <StyledLikeCommentChat>
            <StyledButtonContainer>
              <Button
                width="2rem"
                height="2rem"
                borderRadius="0"
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.background}
                onClick={handleClickLikeBtn}
              >
                <Icon
                  isFill={isLike}
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
                onClick={() => commentInputRef.current?.focus()}
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
                onClick={handleClickDMBtn}
              >
                <Icon
                  isFill={false}
                  name="question_answer"
                  className="post-detail-modal-btn"
                />
              </Button>
            </StyledButtonContainer>
            {/* 포스트 좋아요 정보 */}
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
            {/* 댓글 게시 영역 */}
            <StyledCommentContainer>
              {/* TODO: Input 컴포넌트를 textarea 태그로 바꿀 수 있는 옵션이 있어야 할듯 */}
              <Input
                ref={commentInputRef}
                placeholder="댓글 달기..."
                onChange={handleChangeCommentInput}
                className="post-detail-comment-input"
              />
              <Button
                disabled={isCommentBtnDisabled}
                width="fit-content"
                height="2.5rem"
                borderRadius="0.5rem"
                style={postCommentBtnStyle}
                onClick={handleClickComment}
              >
                게시
              </Button>
            </StyledCommentContainer>
          </StyledLikeCommentChat>
        </StyledPostContentContainer>
      </Modal>
      {/* 점 세개 모달 PostDotModal */}
      {isDotModalOpen && (
        <PostDotModal
          onChangeOpen={handleCloseDotModal}
          onCloseDotModal={handleCloseDotModal}
          onCancelFollow={setIsLike}
        />
      )}
    </>
  ) : null;
};

export default PostDetailModal;
