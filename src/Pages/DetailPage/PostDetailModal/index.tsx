/* eslint-disable no-underscore-dangle */
import {
  KeyboardEvent,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { PostDetailModalProps } from './type';
import Modal from '@/Components/Common/Modal';
import {
  StyledImageCardContainer,
  StyledImage,
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
  StyledLikeContainer,
  StyledCommentContainer,
  postCommentBtnStyle,
  StyledText,
  StyledDeleteCommentContainer,
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
import useMessageReceiver from '@/Stores/MessageReceiver';
import Skeleton from '@/Components/Base/Skeleton';
import PostDetailSkeleton from './PostDetailSkeleton';
import { useReadMessage } from '@/Hooks/Api/Message';
import Alert from '@/Components/Common/Alert';
import NON_AUTH_USER from '@/Constants/nonAuthUser';
import { NotificationTypeList } from '@/Types/Request';

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
  const { setReceiver, setIsClickedUserCard } = useMessageReceiver();
  const { mutateReadMessage } = useReadMessage();

  // 디바이스 크기 조절 감지 함수
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  const handleResize = debounce(() => {
    setDeviceWidth(window.innerWidth);
  });

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const commentInputRef = useRef<HTMLInputElement>(null);

  const { data: postDetailData, isLoading } = useQuery({
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

  const [errorMode, setErrorMode] = useState<NotificationTypeList>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

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
    navigate(-1);
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
    if (Object.keys(authUser).length === 0) {
      setErrorMode('MESSAGE');
      setIsAlertOpen(true);
      return;
    }
    if (postDetailData) {
      if (postDetailData.author._id !== authUser._id) {
        setReceiver(postDetailData.author);
        setIsClickedUserCard(true);
        mutateReadMessage(postDetailData.author._id);
      } else {
        setReceiver(null);
      }
      navigate('/directmessage');
    }
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
    if (Object.keys(authUser).length === 0) {
      setErrorMode('COMMENT');
      setIsAlertOpen(true);
      return;
    }
    const commentText = commentInputRef.current?.value;

    if (commentText && postDetailData)
      commentById(
        {
          comment: commentText,
          postId: postDetailData._id,
        },
        {
          onSuccess: (targetCommentData) => {
            if (targetCommentData) {
              if (commentInputRef.current) commentInputRef.current.value = '';
              handleChangeCommentInput();
              createNotification({
                notificationType: 'COMMENT',
                notificationTypeId: targetCommentData?._id,
                userId: postAuthorId,
                postId: null,
              });
            }
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

  const handleClickCommentIcon = () => {
    if (Object.keys(authUser).length === 0) {
      setErrorMode('COMMENT');
      setIsAlertOpen(true);
      return;
    }
    commentInputRef.current?.focus();
  };

  /**
   * 팔로우 버튼 클릭 동작 함수
   */
  const handleClickFollowBtn = () => {
    if (Object.keys(authUser).length === 0) {
      setErrorMode('FOLLOW');
      setIsAlertOpen(true);
      return;
    }
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
    if (Object.keys(authUser).length === 0) {
      setErrorMode('LIKE');
      setIsAlertOpen(true);
      return;
    }
    const newLikeState = isLike === null ? !isMyLike : !isLike;
    if (newLikeState && postId) {
      likeById(postId, {
        onSuccess: (targetLikeData) => {
          if (targetLikeData && postDetailData) {
            setIsLike(true);
            createNotification({
              notificationType: 'LIKE',
              notificationTypeId: targetLikeData._id,
              userId: postDetailData.author._id,
              postId: targetLikeData.post,
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
        width={deviceWidth < 768 ? 80 : 70}
        height={70}
        onChangeOpen={handleCloseModal}
        flexDirection={deviceWidth < 768 ? 'column' : 'row'}
        style={
          deviceWidth < 768
            ? { overflowY: 'scroll', height: 'auto', maxHeight: '90%' }
            : {}
        }
      >
        {deviceWidth < 768 &&
          (!isLoading ? (
            <StyledAuthorInfo>
              {/* author 정보 및 팔로우 버튼 */}
              <UserCard
                width="fit-content"
                mode={
                  authUser._id !== postDetailData?.author._id
                    ? 'follow'
                    : 'normal'
                }
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
                hoverBackgroundColor="transparent"
                onClick={() => setIsDotModalOpen(true)}
              >
                <Icon name="more_horiz" />
              </Button>
            </StyledAuthorInfo>
          ) : (
            <PostDetailSkeleton.AuthorInfo />
          ))}
        {/* 왼쪽 사진 이미지 영역 */}
        <StyledImageCardContainer>
          {!isLoading && postImageUrl && postImageUrl.length !== 0 ? (
            <StyledImage src={postImageUrl} />
          ) : (
            <Skeleton.Box
              width="100%"
              height="100%"
              {...{ style: { borderRadius: '0 0 0.5rem 0.5rem' } }}
            />
          )}
        </StyledImageCardContainer>
        {/* 오른쪽 포스트 관련 정보 영역 */}
        <StyledPostContentContainer>
          {deviceWidth >= 768 &&
            (!isLoading ? (
              <StyledAuthorInfo>
                {/* author 정보 및 팔로우 버튼 */}
                <UserCard
                  width="fit-content"
                  mode={
                    authUser._id !== postDetailData?.author._id
                      ? 'follow'
                      : 'normal'
                  }
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
                  hoverBackgroundColor="transparent"
                  onClick={() => setIsDotModalOpen(true)}
                >
                  <Icon name="more_horiz" />
                </Button>
              </StyledAuthorInfo>
            ) : (
              <PostDetailSkeleton.AuthorInfo />
            ))}
          {!isLoading ? (
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
                  style={{ backgroundColor: 'transparent', padding: '0' }}
                />
                <StyledEditTime>{postEditTime}</StyledEditTime>
              </StyledPostMainTopContainer>
              <StyledPostContent>{postContents}</StyledPostContent>
              {/* 포스트 댓글 영역 */}
              <StyledCommentHistory>
                {postComment &&
                  postComment.map(
                    ({ author, _id, comment, createdAt, updatedAt }) => {
                      return (
                        <StyledComment key={_id}>
                          <UserCard
                            width="fit-content"
                            badgeSize="0"
                            userName={author.fullName}
                            coverImageUrl={
                              author.image || DEFAULT_USER_IMAGE_SRC
                            }
                            userDetail={
                              createdAt === updatedAt
                                ? calculateDate(createdAt)
                                : calculateDate(updatedAt)
                            }
                            className="post-detail-user-card"
                            onClickUser={() => handleClickUser(author._id)}
                            style={{
                              backgroundColor: 'transparent',
                              padding: '0',
                              minWidth: '10rem',
                            }}
                            isRead
                          />
                          <StyledTextContainer>
                            <StyledText>{comment}</StyledText>
                            {author._id === authUser._id && (
                              <StyledDeleteCommentContainer>
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
                              </StyledDeleteCommentContainer>
                            )}
                          </StyledTextContainer>
                        </StyledComment>
                      );
                    },
                  )}
              </StyledCommentHistory>
            </StyledPostMainInfo>
          ) : (
            <PostDetailSkeleton.PostMainInfo />
          )}

          {/* 좋아요, 댓글, DM 버튼 영역 */}
          <StyledLikeCommentChat>
            {!isLoading ? (
              <>
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
                    onClick={handleClickCommentIcon}
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
                <StyledLikeContainer>
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
                </StyledLikeContainer>
              </>
            ) : (
              <PostDetailSkeleton.LikeCommentChat />
            )}

            {/* 댓글 게시 영역 */}
            <StyledCommentContainer>
              <Input
                disabled={Object.keys(authUser).length === 0}
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
                backgroundColor={colors.buttonBackground}
                textColor={colors.text}
                hoverBackgroundColor={
                  isCommentBtnDisabled
                    ? colors.buttonBackground
                    : colors.buttonHoverBackground
                }
                hoverTextColor={
                  isCommentBtnDisabled
                    ? colors.textNonSelect
                    : colors.textReverse
                }
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
      {isAlertOpen && (
        <Alert
          mode="confirm"
          message={
            <>
              {errorMode === 'FOLLOW' && <div>{NON_AUTH_USER.FOLLOW}</div>}
              {errorMode === 'MESSAGE' && <div>{NON_AUTH_USER.MESSAGE}</div>}
              {errorMode === 'LIKE' && <div>{NON_AUTH_USER.LIKE}</div>}
              {errorMode === 'COMMENT' && <div>{NON_AUTH_USER.COMMENT}</div>}
              <div>{NON_AUTH_USER.LOGIN}</div>
            </>
          }
          onConfirm={() => navigate('/login')}
          onCancle={() => setIsAlertOpen(false)}
        />
      )}
    </>
  ) : null;
};

export default PostDetailModal;
