/* eslint no-underscore-dangle: 0 */
// _id 파라미터 사용시 eslint 에러 발생 방지
import { useTheme } from 'styled-components';
import { MouseEvent, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

// import { debounce } from 'lodash';
import {
  StyledCategoryList,
  StyledCategoryTitle,
  StyledCategoryTitleContainer,
  StyledDropDown,
  StyledHeaderContainer,
  StyledLeftContainer,
  StyledMainContentContainer,
  StyledNoPost,
  StyledObserver,
  StyledPostCardList,
  StyledWrapper,
} from './style';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { getChannels } from '@/Services/Channel';
import channels from '@/Constants/Channels';
import { getPostByChannel } from '@/Services/Post';
import PostCard from '@/Components/Common/PostCard';
import UserManager from '@/Components/UserManager';
import useAuthUserStore from '@/Stores/AuthUser';
import { checkAuth } from '@/Services/Auth';
import QUERY_KEYS from '@/Constants/queryKeys';
import { useFollowByUserId, useUnfollowByUserId } from '@/Hooks/Api/Follow';
import { useDisLikeById, useLikeById } from '@/Hooks/Api/Like';
import { useCreateNotification } from '@/Hooks/Api/Notification';
import PostCardSkeletion from '@/Components/Common/PostCard/PostCardSkeleton';
import { useChannelStore } from '@/Stores';
import useResize from '@/Hooks/useResize';
import DropDown from '@/Components/Common/DropDown';
import { ChannelType } from '@/Types/ChannelType';
import { NotificationTypeList } from '@/Types/Request';
import Alert from '@/Components/Common/Alert';
import NON_AUTH_USER from '@/Constants/nonAuthUser';

const HomePage = () => {
  const { colors, size } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isMobileSize } = useResize();

  const { user: authUser, setAuthUser } = useAuthUserStore();
  const { currentChannelId, setCurrentChannelId } = useChannelStore();
  const [refInView, inView] = useInView();

  const { likeById } = useLikeById();
  const { disLikeById } = useDisLikeById();
  const { followByUserId } = useFollowByUserId();
  const { unfollowByUserId } = useUnfollowByUserId();
  const { createNotification } = useCreateNotification();

  const [errorMode, setErrorMode] = useState<NotificationTypeList>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClickUserName = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  /**
   *
   * @param e 채널 버튼 클릭 이벤트
   * @returns eslint 에러때문에 반환, channelId 상태 업데이트
   */
  const handleClickChannel = (e: MouseEvent<HTMLButtonElement>) => {
    const channelId = e.currentTarget.dataset.id;

    // 다른 채널 클릭 시 무한 스크롤 쿼리 초기화
    if (channelId !== currentChannelId) {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
    }

    return channelId && setCurrentChannelId(channelId);
  };

  /**
   * 메인페이지 최초 접속 시 사용자 인증 여부 확인하고
   * user 데이터를 스토어에 저장하는 useQuery 훅
   */
  const { data: userObj, isLoading: isCheckAuthLoading } = useQuery({
    queryKey: [QUERY_KEYS.CHECK_AUTH],
    queryFn: checkAuth,
  });

  useEffect(() => {
    if (!isCheckAuthLoading && userObj) setAuthUser(userObj);
  }, [isCheckAuthLoading, userObj, setAuthUser]);

  /**
   * 모든 채널을 fetch하는 useQuery 훅
   */
  const {
    data: channelList,
    isSuccess: isChannelListSuccess,
    // isLoading: isChannelListLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.CHANNEL_LIST],
    queryFn: getChannels,
    enabled: !isCheckAuthLoading,
  });

  // 채널명 배열
  const channelNameList = channelList
    ?.map((channel) => {
      if (Object.keys(channels).includes(channel.name)) {
        return channels[channel.name];
      }
      return channel.name;
    })
    .filter((channelName) => channelName);

  /**
   * 채널이 변경되면 해당 채널에 대한 포스트를 10개씩 불러오는 함수
   * postOffeset이 10씩 증가하고 중복해서 포스트를 불러오지 않도록 가드 구현
   * @param channelId 채널 ID
   */

  const {
    hasNextPage,
    data: postList,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POST_BY_ID, currentChannelId],
    queryFn: ({ pageParam }) =>
      getPostByChannel(currentChannelId, {
        offset: pageParam,
        limit: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length !== 0 ? allPages.length * 10 : undefined;
    },
    enabled:
      !isCheckAuthLoading && isChannelListSuccess && currentChannelId !== '',
  });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  /**
   * 채널 생성 모달 여는 함수
   */
  const handleOpenCreateChannel = () => {
    navigate('/add-channel');
  };

  /**
   * 메인 페이지에서 포스트 Card의 좋아요 버튼 클릭 시 api 호출하는 함수
   * @param id target postId
   * @param newState 바뀔 좋아요 상태
   */
  const handleClickLike = (
    targetPostId: string,
    targetAuthorId: string,
    newState: boolean,
  ) => {
    if (Object.keys(authUser).length === 0) {
      setErrorMode('LIKE');
      setIsAlertOpen(true);
      return;
    }
    if (newState) {
      likeById(targetPostId, {
        onSuccess: (targetLikeData) => {
          if (targetLikeData) {
            createNotification({
              notificationType: 'LIKE',
              notificationTypeId: targetLikeData._id,
              userId: targetAuthorId,
              postId: targetLikeData.post,
            });
          }
        },
      });
    } else if (authUser) {
      authUser.following?.forEach(({ user, _id: followId }) => {
        if (user === targetUserId) {
          unfollowByUserId(followId);
        }
      });
    }
  };

  /*
   * 포스트 ID를 받아 해당 포스트 상세 모달 중첩 라우팅해주는 함수
   * @param postId 포스트 ID
   */
  const handleClickPostImage = (postId: string) => {
    navigate(`/modal-detail/${postId}`);
  };

  /**
   * follow api 연동 함수
   */
  const handleFollowClick = (
    nextFollowState: boolean,
    targetUserId: string,
  ) => {
    if (Object.keys(authUser).length === 0) {
      setErrorMode('FOLLOW');
      setIsAlertOpen(true);
      return;
    }
    if (nextFollowState) {
      followByUserId(targetUserId, {
        onSuccess: (targetFollowData) => {
          if (targetFollowData) {
            createNotification({
              notificationType: 'FOLLOW',
              notificationTypeId: targetFollowData._id,
              userId: targetUserId,
              postId: null,
            });
          }
        },
      });
    } else if (authUser) {
      authUser.following?.forEach(({ follower, _id: followId }) => {
        if (follower === authUser._id) {
          unfollowByUserId(followId);
        }
      });
    }
  };

  return (
    <>
      {/* Header 컴포넌트 있다고 가정 */}
      <StyledHeaderContainer />
      {/* 모바일 카테고리 드롭다운 */}
      {isMobileSize && (
        <StyledDropDown>
          <DropDown
            options={channelNameList || []}
            onSelect={(optionName) =>
              setCurrentChannelId(
                channelList?.filter(
                  (channel: ChannelType) =>
                    channel.name === optionName ||
                    channels[channel.name] === optionName,
                )[0]?._id || '',
              )
            }
            optionProps={{ className: 'category-options' }}
          />
        </StyledDropDown>
      )}
      <StyledWrapper>
        <StyledLeftContainer>
          <StyledCategoryTitleContainer>
            <StyledCategoryTitle>Category</StyledCategoryTitle>
            {/* 카테고리 채널 추가 버튼 */}
            {authUser.role === 'SuperAdmin' && (
              <Button
                width={size.large}
                height={size.large}
                borderRadius="0.5rem"
                textSize={size.medium}
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.backgroundGrey}
                onClick={handleOpenCreateChannel}
              >
                <Icon
                  name="add"
                  style={{
                    color: `grey`,
                    fontSize: `${size.large}`,
                  }}
                />
              </Button>
            )}
          </StyledCategoryTitleContainer>
          {/* 채널 버튼 리스트 */}
          <StyledCategoryList>
            {channelList?.map((channel) => {
              return (
                <Button
                  key={channel._id}
                  data-id={channel._id}
                  height={size.doubleLarge}
                  borderRadius="1rem"
                  textSize={size.large}
                  backgroundColor="none"
                  hoverTextColor={colors.text}
                  hoverBackgroundColor="none"
                  textColor={
                    channel._id === currentChannelId
                      ? colors.text
                      : colors.textNonSelect
                  }
                  onClick={handleClickChannel}
                  className="category-button"
                  style={{ justifyContent: 'start' }}
                  isHoverBold
                  isBold={channel._id === currentChannelId}
                >
                  {channels[channel.name] || channel.name}
                </Button>
              );
            })}
          </StyledCategoryList>
        </StyledLeftContainer>
        <StyledMainContentContainer>
          {/* 포스트 카드 리스트 */}
          <StyledPostCardList>
            {currentChannelId === '' && (
              <StyledNoPost>카테고리를 선택해주세요!</StyledNoPost>
            )}
            {postList
              ? postList.pages.map((cards) => {
                  return cards?.map((post) => (
                    <PostCard
                      key={post._id}
                      authUser={userObj}
                      postId={post._id}
                      width="100%"
                      imageUrl={post.image || ''}
                      content={post.title || ''}
                      authorName={post.author.fullName || ''}
                      authorId={post.author._id}
                      authorThumbnail={post.author.image || ''}
                      isFollower={post.author.followers.some(
                        (follower) =>
                          authUser.following?.some(
                            ({ _id }) => _id === follower,
                          ),
                      )}
                      isLike={
                        authUser &&
                        post.likes.some(({ user }) => user === authUser._id)
                      }
                      onImageClick={() => handleClickPostImage(post._id)}
                      myLikeId={
                        post.likes.find(({ user }) => user === authUser._id)
                          ?._id || ''
                      }
                      onUserNameClick={() =>
                        handleClickUserName(post.author._id)
                      }
                      onLikeIconClick={handleClickLike}
                      onFollowBtnClick={handleFollowClick}
                    />
                  ));
                })
              : null}
            {(isLoading || isFetchingNextPage) &&
              Array.from(Array(3), (_, index) => (
                <PostCardSkeletion.PostCard key={index} />
              ))}
            {postList?.pages[0] &&
              postList.pages[0].length === 0 &&
              currentChannelId !== '' &&
              !isLoading &&
              !isFetchingNextPage && (
                <StyledNoPost>페이지가 없습니다.</StyledNoPost>
              )}
            {hasNextPage && (
              <StyledObserver
                className="observer"
                ref={refInView}
              />
            )}
          </StyledPostCardList>
        </StyledMainContentContainer>
        <UserManager />
      </StyledWrapper>
      {isAlertOpen && (
        <Alert
          mode="confirm"
          message={
            <>
              {errorMode === 'FOLLOW' && <div>{NON_AUTH_USER.FOLLOW}</div>}
              {errorMode === 'LIKE' && <div>{NON_AUTH_USER.LIKE}</div>}
              <div>{NON_AUTH_USER.LOGIN}</div>
            </>
          }
          onConfirm={() => navigate('/login')}
          onCancle={() => setIsAlertOpen(false)}
        />
      )}
      <Outlet />
    </>
  );
};

export default HomePage;
