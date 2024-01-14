/* eslint-disable no-underscore-dangle */
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import QUERY_KEYS from '@/Constants/queryKeys';
import { getUser } from '@/Services/User';
import { calculateDate } from '@/Utils/UTCtoKST';
import DEFAULT_USER_IMAGE_SRC from '@/Constants/defaultUserImage';
import { createLike, deleteLike } from '@/Services/Like';
import { getPostDetail } from '@/Services/Post';
import useAuthUserStore from '@/Stores/AuthUser';

const PostDetailModal = ({
  postLike,
  postComment,
  postContents,
  postImageUrl,
  postAuthor,
  postAuthorId,
  authorAvatar,
  postEditTime,
}: PostDetailModalProps) => {
  const navigate = useNavigate();
  const { colors } = useTheme();
  const { postId } = useParams();
  const queryClient = useQueryClient();
  const { user: authUser } = useAuthUserStore();

  const commentInputRef = useRef<HTMLInputElement>(null);

  const { data: postDetailData, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID, postId],
    queryFn: () => getPostDetail(postId || ''),
  });

  const isMyLike = postDetailData?.likes.some(
    ({ user }) => user === authUser._id,
  );

  const myLikeList = useMemo(() => {
    return postDetailData?.likes.filter(({ user }) => user === authUser._id);
  }, [authUser._id, postDetailData?.likes]);

  const [isPostDetailModalOpen, setIsPostDetailModalOpen] = useState(true);
  const [isDotModalOpen, setIsDotModalOpen] = useState(false);
  const [isCommentBtnDisabled, setIsCommentBtnDisabled] = useState(true);
  const [isFollow, setIsFollow] = useState(false);
  const [isLike, setIsLike] = useState<boolean | null>(null);

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
   * 팔로우 버튼 클릭 동작 함수
   */
  const handleClickFollowBtn = () => {
    // TODO: 팔로우 api 추가
    setIsFollow(!isFollow);
  };

  /**
   * DM 버튼 클릭 동작 함수
   */
  const handleClickDMBtn = () => {
    // TODO: DM 페이지 라우팅 연결
    navigate('/directmessage');
  };

  /**
   * 댓글 게시하는 함수
   */
  const handleClickComment = () => {
    // TODO: 댓글 게시 api 연결
  };

  const { mutate: likeById } = useMutation({
    mutationFn: (likePostId: string) => createLike(likePostId),
    onSuccess: () => {
      setIsLike(true);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
    },
  });

  const { mutate: disLikeById } = useMutation({
    mutationFn: (disLikeId: string) => deleteLike(disLikeId),
    onSuccess: () => {
      setIsLike(false);
    },
    onSettled: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_BY_ID],
      });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID],
      });
    },
  });

  /**
   * 좋아요 버튼 클릭 동작 함수
   */
  const handleClickLikeBtn = () => {
    const newLikeState = isLike === null ? !isMyLike : !isLike;
    if (newLikeState && postId) {
      likeById(postId);
    } else if (myLikeList) {
      myLikeList?.forEach(({ _id: likeId }) => disLikeById(likeId));
    }
  };

  /**
   * 좋아요한 첫 번째 사람의 정보를 가져오는 useQuery 훅
   * ~명이 좋아합니다에 필요해서 추가
   */
  const postLikeList = postLike && postLike?.length !== 0 && postLike[0].user;
  const { data: firstLikeUser } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, postLikeList],
    queryFn: () => getUser(postLikeList || ''),
    enabled: !!postLikeList,
  });

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
              coverImageUrl={authorAvatar || DEFAULT_USER_IMAGE_SRC}
              isFollow={isFollow}
              className="post-detail-user-card"
              onClickFollowBtn={handleClickFollowBtn}
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
                coverImageUrl={authorAvatar || DEFAULT_USER_IMAGE_SRC}
                className="post-detail-user-card"
              />
              {/* TODO: 경과 시간 계산 구현 */}
              <StyledEditTime>{postEditTime}</StyledEditTime>
            </StyledPostMainTopContainer>
            {/* TODO: 내용 많을 시 말줄임표 및 클릭 시 말줄임표 해제 */}
            <StyledPostContent>{postContents}</StyledPostContent>
            {/* 포스트 댓글 영역 */}
            <StyledCommentHistory>
              {postComment?.length !== 0 && '댓글'}
              {postComment &&
                postComment.map(
                  ({ author, _id, comment, createdAt, updatedAt }) => (
                    <StyledComment key={_id}>
                      <UserCard
                        width="fit-content"
                        badgeSize="0"
                        userName={author.fullName}
                        // TODO: 댓글 단 사람에 대한 프로필 이미지 불러오는 useQuery 필요
                        coverImageUrl={DEFAULT_USER_IMAGE_SRC}
                        userDetail={
                          createdAt === updatedAt
                            ? calculateDate(createdAt)
                            : calculateDate(updatedAt)
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
                  isFill={isLike !== null ? isLike : isMyLike}
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
              {postLike && postLike.length !== 0 ? (
                <>
                  <UserCard
                    width="fit-content"
                    badgeSize="0"
                    userName={firstLikeUser?.fullName}
                    coverImageUrl={
                      firstLikeUser?.image || DEFAULT_USER_IMAGE_SRC
                    }
                    className="post-detail-user-card"
                  />
                  <StyledLikeText>님</StyledLikeText>
                  {postLike.length > 1 && (
                    <StyledLikeText className="like-extra-text">
                      {`외 ${postLike.length - 1}명`}
                    </StyledLikeText>
                  )}

                  <StyledLikeText>이 좋아합니다.</StyledLikeText>
                </>
              ) : null}
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
          isFollow={isFollow}
          postAuthorId={postAuthorId}
          onChangeOpen={handleCloseDotModal}
          onCloseDotModal={handleCloseDotModal}
          onCancelFollow={setIsFollow}
        />
      )}
    </>
  ) : null;
};

export default PostDetailModal;
