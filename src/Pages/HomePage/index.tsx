/* eslint no-underscore-dangle: 0 */
// _id 파라미터 사용시 eslint 에러 발생 방지
import { useTheme } from 'styled-components';
import { MouseEvent, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import {
  StyledCategoryList,
  StyledCategoryTitle,
  StyledCategoryTitleContainer,
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
import { createLike, deleteLike } from '@/Services/Like';

const HomePage = () => {
  const { colors, size } = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user: authUser, setAuthUser } = useAuthUserStore();
  const [refInView, inView] = useInView();

  const [currentChannelId, setCurrentChannelId] = useState('all');

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
    enabled: !isCheckAuthLoading && !!userObj,
  });

  /**
   * 채널이 변경되면 해당 채널에 대한 포스트를 10개씩 불러오는 함수
   * postOffeset이 10씩 증가하고 중복해서 포스트를 불러오지 않도록 가드 구현
   * @param channelId 채널 ID
   */
  const {
    hasNextPage,
    data: postList,
    fetchNextPage,
    // fetchPreviousPage,
    // hasPreviousPage,
    // isFetchingNextPage,
    // isFetchingPreviousPage,
    // isSuccess,
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
      !isCheckAuthLoading &&
      !!userObj &&
      isChannelListSuccess &&
      currentChannelId !== 'all',
  });

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  /**
   * 좋아요 api 호출 useMutation 훅
   */
  const { mutate: likeById } = useMutation({
    mutationFn: (likePostId: string) => createLike(likePostId),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
    },
  });

  /**
   * 좋아요 취소 api 호출 useMutation 훅
   */
  const { mutate: disLikeById } = useMutation({
    mutationFn: (disLikeId: string) => deleteLike(disLikeId),
    onSuccess: () => {},
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.POST_BY_ID] });
    },
  });

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
  const handleClickLike = (id: string, newState: boolean) => {
    if (newState) {
      likeById(id);
    } else if (postList) {
      const targetPost = postList.pages.map((page) => {
        return page?.find((post) => post._id === id);
      });

      targetPost[0]?.likes.forEach(({ _id, user }) => {
        if (user === authUser._id) {
          disLikeById(_id);
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

  return (
    <>
      {/* Header 컴포넌트 있다고 가정 */}
      <StyledHeaderContainer />

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
                  style={{ color: `grey`, fontSize: `${size.large}` }}
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
            {postList ? (
              postList.pages.map((cards) => {
                return cards?.map((post) => (
                  <PostCard
                    key={post._id}
                    postId={post._id}
                    imageUrl={post.image || ''}
                    content={post.title || ''}
                    authorName={post.author.fullName || ''}
                    authorThumbnail=""
                    isFollower
                    isLike={
                      authUser &&
                      post.likes.some(({ user }) => user === authUser._id)
                    }
                    onImageClick={() => handleClickPostImage(post._id)}
                    myLikeId={
                      post.likes.find(({ user }) => user === authUser._id)
                        ?._id || ''
                    }
                    onLikeIconClick={handleClickLike}
                  />
                ));
              })
            ) : (
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
      <Outlet />
    </>
  );
};

export default HomePage;
