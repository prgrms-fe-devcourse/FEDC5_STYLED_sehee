/* eslint-disable no-underscore-dangle */
import {
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
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
  StyledTextContainer,
  StyledLikeText,
  StyledButtonContainer,
  StledLikeContainer,
  StyledCommentContainer,
  postCommentBtnStyle,
  StyledText,
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
import { getPostDetail } from '@/Services/Post';
import useAuthUserStore from '@/Stores/AuthUser';
import { useDisLikeById, useLikeById } from '@/Hooks/Api/Like';
import { useFollowByUserId, useUnfollowByUserId } from '@/Hooks/Api/Follow';
import { useCreateComment, useDeleteComment } from '@/Hooks/Api/Comment';
import { useCreateNotification } from '@/Hooks/Api/Notification';

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
  const { colors, size } = useTheme();
  const { postId } = useParams();
  const { user: authUser } = useAuthUserStore();

  const commentInputRef = useRef<HTMLInputElement>(null);

  const { data: postDetailData } = useQuery({
    queryKey: [QUERY_KEYS.POST_DETAIL_BY_ID, postId],
    queryFn: () => getPostDetail(postId || ''),
  });

  const isMyLike = postDetailData?.likes.some(
    ({ user }) => user === authUser._id,
  );

  const isMyFollow = postDetailData?.author.followers.some(
    (follower) => authUser.following?.some(({ _id }) => _id === follower),
  );

  const myLikeList = useMemo(() => {
    return postDetailData?.likes.filter(({ user }) => user === authUser._id);
  }, [authUser._id, postDetailData?.likes]);

  const [isPostDetailModalOpen, setIsPostDetailModalOpen] = useState(true);
  const [isDotModalOpen, setIsDotModalOpen] = useState(false);
  const [isCommentBtnDisabled, setIsCommentBtnDisabled] = useState(true);
  const [isFollow, setIsFollow] = useState<boolean | null>(null);
  const [isLike, setIsLike] = useState<boolean | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const { commentById } = useCreateComment();
  const { deleteCommentById } = useDeleteComment();
  const { followByUserId } = useFollowByUserId();
  const { unfollowByUserId } = useUnfollowByUserId();
  const { likeById } = useLikeById();
  const { disLikeById } = useDisLikeById();
  const { createNotification } = useCreateNotification();

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
   * DM 버튼 클릭 동작 함수
   */
  const handleClickDMBtn = () => {
    navigate('/directmessage');
  };

  /**
   * 유저 ID 또는 아바타 클릭 시 해당 유저 페이지 이동 함수
   */
  const handleClickUser = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  /**
   * 댓글 게시하는 함수
   */
  const sendComment = () => {
    const commentText = commentInputRef.current?.value;

    if (commentText && postDetailData)
      commentById(
        {
          comment: commentText,
          postId: postDetailData._id,
        },
        {
          onSuccess: () => {
            if (commentInputRef.current) commentInputRef.current.value = '';
            handleChangeCommentInput();
          },
        },
      );
  };
  /**
   * 댓글 게시 버튼으로 댓글 게시하는 함수
   */
  const handleClickComment = () => {
    sendComment();
  };
  /**
   * Enter 버튼으로 댓글 게시하는 함수
   */
  const handleCommentInputEnter: KeyboardEventHandler<HTMLInputElement> = (
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    // 한글 2번 입력 방지
    if (e.code === 'Enter') {
      if (isComposing) return;
      sendComment();
    }
  };

  const handleClickDeleteComment = (commentId: string) => {
    deleteCommentById(commentId);
  };

  /**
   * 팔로우 버튼 클릭 동작 함수
   */
  const handleClickFollowBtn = () => {
    const newFollowState = isFollow === null ? !isMyFollow : !isFollow;
    const targetUserId = postDetailData?.author._id || '';
    if (newFollowState) {
      followByUserId(targetUserId, {
        onSuccess: (targetFollowData) => {
          if (targetFollowData) {
            setIsFollow(true);
            createNotification({
              notificationType: 'FOLLOW',
              notificationTypeId: targetFollowData._id,
              userId: targetUserId,
              postId: null,
            });
          }
        },
      });
    } else if (myLikeList) {
      authUser.following?.forEach(({ user, _id: followId }) => {
        if (user === targetUserId) {
          unfollowByUserId(followId);
          setIsFollow(false);
        }
      });
    }
  };

  /**
   * 좋아요 버튼 클릭 동작 함수
   */
  const handleClickLikeBtn = () => {
    const newLikeState = isLike === null ? !isMyLike : !isLike;
    if (newLikeState && postId) {
      likeById(postId, {
        onSuccess: (targetLikeData) => {
          if (targetLikeData && postDetailData) {
            setIsLike(true);
            createNotification({
              notificationType: 'LIKE',
              notificationTypeId: targetLikeData._id || '',
              userId: postDetailData.author._id || '',
              postId: targetLikeData.post || '',
            });
          }
        },
      });
    } else if (myLikeList) {
      myLikeList?.forEach(({ _id: likeId }) =>
        disLikeById(likeId, {
          onSuccess: () => {
            setIsLike(false);
          },
        }),
      );
    }
  };

  /**
   * 좋아요한 첫 번째 사람의 정보를 가져오는 useQuery 훅
   * ~명이 좋아합니다에 필요해서 추가
   */
  const firstLikeUserId = postLike && postLike.length !== 0 && postLike[0].user;
  const { data: firstLikeUser } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER_BY_ID, firstLikeUserId],
    queryFn: () => getUser(firstLikeUserId || ''),
    enabled: !!firstLikeUserId,
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
            <UserCard
              width="fit-content"
              mode="follow"
              badgeSize="0"
              userName={postAuthor}
              coverImageUrl={authorAvatar || DEFAULT_USER_IMAGE_SRC}
              isFollow={isFollow !== null ? isFollow : isMyFollow}
              className="post-detail-user-card"
              onClickFollowBtn={handleClickFollowBtn}
              onClickUser={() =>
                handleClickUser(postDetailData?.author._id || '')
              }
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
                onClickUser={() =>
                  handleClickUser(postDetailData?.author._id || '')
                }
              />
              <StyledEditTime>{postEditTime}</StyledEditTime>
            </StyledPostMainTopContainer>
            <StyledPostContent>{postContents}</StyledPostContent>
            {/* 포스트 댓글 영역 */}
            <StyledCommentHistory>
              {postComment?.length !== 0 && '댓글'}
              {postComment &&
                postComment.map(
                  ({ author, _id, comment, createdAt, updatedAt }) => {
                    return (
                      <StyledComment key={_id}>
                        <UserCard
                          width="fit-content"
                          badgeSize="0"
                          userName={author.fullName}
                          // TODO: 댓글 단 사람에 대한 프로필 이미지 불러오는 useQuery 필요
                          coverImageUrl={author.image || DEFAULT_USER_IMAGE_SRC}
                          userDetail={
                            createdAt === updatedAt
                              ? calculateDate(createdAt)
                              : calculateDate(updatedAt)
                          }
                          className="post-detail-user-card"
                          onClickUser={() => handleClickUser(author._id)}
                        />
                        <StyledTextContainer>
                          <StyledText>{comment}</StyledText>
                          {author._id === authUser._id && (
                            <Button
                              width={size.medium}
                              height={size.medium}
                              backgroundColor={colors.background}
                              hoverBackgroundColor={colors.background}
                              style={{ padding: '0' }}
                              onClick={() => handleClickDeleteComment(_id)}
                            >
                              <Icon
                                name="close"
                                style={{ fontSize: '1.5rem' }}
                              />
                            </Button>
                          )}
                        </StyledTextContainer>
                      </StyledComment>
                    );
                  },
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
                    userName={firstLikeUser?.fullName || 'STYLED 관리자'}
                    coverImageUrl={
                      firstLikeUser?.image || DEFAULT_USER_IMAGE_SRC
                    }
                    className="post-detail-user-card"
                    onClickUser={() =>
                      handleClickUser(firstLikeUser?._id || '')
                    }
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
                onKeyDown={handleCommentInputEnter}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
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
          postId={postDetailData?._id || ''}
          isFollow={isFollow !== null ? isFollow : isMyFollow}
          postAuthorId={postAuthorId}
          onChangeOpen={handleCloseDotModal}
          onCloseDotModal={handleCloseDotModal}
          onCancelFollow={() => {
            handleClickFollowBtn();
          }}
        />
      )}
    </>
  ) : null;
};

export default PostDetailModal;
