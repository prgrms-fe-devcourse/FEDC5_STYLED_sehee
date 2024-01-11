/* eslint no-underscore-dangle: 0 */
// _id 파라미터 사용시 eslint 에러 발생 방지
import { useTheme } from 'styled-components';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { ChannelType } from '@/Types/ChannelType';
import channels from '@/Constants/Channels';
import { getUsers } from '@/Services/User';
import { UserType } from '@/Types/UserType';
import { getPostByChannel } from '@/Services/Post';
import { PostType } from '@/Types/PostType';
import PostCard from '@/Components/Common/PostCard';
import UserManager from '@/Components/UserManager';
import useAuthUserStore from '@/Stores/AuthUser';
import { checkAuth } from '@/Services/Auth';

const HomePage = () => {
  const { colors, size } = useTheme();
  const { user: authUser, setAuthUser } = useAuthUserStore();
  const [refInView, inView] = useInView();

  const [channelList, setChannelList] = useState<ChannelType[]>([]);
  const [userList, setUserList] = useState<UserType[]>([]);
  const [currentChannelId, setCurrentChannelId] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedUserList, setSearchedUserList] = useState<UserType[]>([]);
  const [postList, setPostList] = useState<PostType[]>([]);
  const [postOffset, setPostOffset] = useState(0);

  /**
   *
   * @param e 채널 버튼 클릭 이벤트
   * @returns eslint 에러때문에 반환, channelId 상태 업데이트
   */
  const handleClickChannel = (e: MouseEvent<HTMLButtonElement>) => {
    const channelId = e.currentTarget.dataset.id;

    if (channelId !== currentChannelId) {
      setPostList([]);
      setPostOffset(0);
    }

    return channelId && setCurrentChannelId(channelId);
  };

  /**
   * 유저 목록 상단 검색창 입력 문자 change event 관리하는 핸들러 함수
   */
  const handleChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const inputKeyword = e.target.value;
    setSearchKeyword(inputKeyword);
  }, []);

  /**
   * 메인페이지 최초 접속 시 사용자 인증 여부 확인하고
   * user 데이터를 스토어에 저장하는 useQuery 훅
   */
  const { data: userObj, isSuccess } = useQuery({
    queryKey: ['currentUser'],
    queryFn: checkAuth,
  });

  /**
   * 모든 채널을 fetch하는 함수
   * @return setChannelList 함수 실행 void
   */
  const fetchChannelList = async () => {
    const channelData = await getChannels();

    return channelData && setChannelList(channelData);
  };

  /**
   * 모든 유저 리스트를 fetch하는 함수
   * @returns 관리자 계정 제외한 유저 리스트 setUserList로 업데이트
   */
  const fetchUserList = async () => {
    const userData = await getUsers();

    // 관리자 계정 제외 필터링
    const filteredUserList = userData?.filter(
      ({ role }) => role !== 'SuperAdmin',
    );

    return filteredUserList && setUserList(filteredUserList);
  };

  /**
   * 채널이 변경되면 해당 채널에 대한 포스트를 10개씩 불러오는 함수
   * postOffeset이 10씩 증가하고 중복해서 포스트를 불러오지 않도록 가드 구현
   * @param channelId 채널 ID
   */
  const fetchPostList = useCallback(
    async (channelId: string) => {
      const postData = await getPostByChannel(channelId, {
        offset: postOffset,
        limit: 10,
      });

      if (postData?.length !== 0 && postData) {
        const newPostList = postData && [...postList, ...postData];

        setPostOffset(postOffset + 10);
        return newPostList && setPostList(newPostList);
      }

      return postList;
    },
    [postOffset, postList],
  );

  /**
   * 검색 폼으로 유저 전체 목록에서 일치하는 유저 필터링하는 함수
   * @param users 유저 전체 목록
   * @param searchQuery 검색어
   * @return 일치하는 유저 목록 리스트 반환
   */
  const matchUserList = useCallback(
    (users: UserType[], searchQuery: string) => {
      if (!searchQuery) setSearchedUserList([]);

      const result = users.filter(({ fullName }) => {
        return (
          fullName.includes(searchQuery) ||
          fullName.toLowerCase().includes(searchQuery)
        );
      });

      if (result) setSearchedUserList(result);

      return result;
    },
    [],
  );

  useEffect(() => {
    if (channelList.length === 0) fetchChannelList();
    if (userList.length === 0) fetchUserList();

    matchUserList(userList, searchKeyword);
  }, [
    channelList.length,
    userList.length,
    matchUserList,
    searchKeyword,
    userList,
  ]);

  useEffect(() => {
    if ((currentChannelId !== 'all' && postOffset === 0) || inView) {
      fetchPostList(currentChannelId);
    }
  }, [currentChannelId, fetchPostList, inView, postOffset]);

  /**
   * 로그인 인증 시 유저 정보 갱신
   */

  useEffect(() => {
    if (isSuccess && userObj) {
      setAuthUser(userObj);
    }
  }, [isSuccess, setAuthUser, userObj]);

  return (
    <>
      {/* Header 컴포넌트 있다고 가정 */}
      <StyledHeaderContainer />

      <StyledWrapper>
        <StyledLeftContainer>
          <StyledCategoryTitleContainer>
            <StyledCategoryTitle>카테고리</StyledCategoryTitle>
            {/* 카테고리 채널 추가 버튼 */}
            {authUser.role === 'SuperAdmin' && (
              <Button
                width={size.large}
                height={size.large}
                borderRadius="0.5rem"
                textSize={size.medium}
                backgroundColor={colors.background}
                hoverBackgroundColor={colors.backgroundGrey}
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
            <Button
              data-id="all"
              width="80%"
              height={size.doubleLarge}
              borderRadius="1rem"
              textSize={size.medium}
              backgroundColor={
                currentChannelId === 'all'
                  ? colors.backgroundGrey
                  : colors.background
              }
              hoverBackgroundColor={
                currentChannelId === 'all'
                  ? colors.backgroundGrey
                  : colors.focusHover
              }
              textColor={colors.text}
              onClick={handleClickChannel}
            >
              전체
            </Button>
            {channelList.map((channel) => {
              return (
                <Button
                  key={channel._id}
                  data-id={channel._id}
                  width="80%"
                  height={size.doubleLarge}
                  borderRadius="1rem"
                  textSize={size.medium}
                  backgroundColor={
                    currentChannelId === channel._id
                      ? colors.backgroundGrey
                      : colors.background
                  }
                  hoverBackgroundColor={
                    currentChannelId === channel._id
                      ? colors.backgroundGrey
                      : colors.focusHover
                  }
                  textColor={colors.text}
                  onClick={handleClickChannel}
                >
                  {channels[channel.name]}
                </Button>
              );
            })}
          </StyledCategoryList>
        </StyledLeftContainer>
        <StyledMainContentContainer>
          {/* 포스트 카드 리스트 */}
          {postList.length !== 0 ? (
            <StyledPostCardList>
              {postList.map((post) => (
                <PostCard
                  key={post._id}
                  imageUrl={post.image || ''}
                  content={post.title || ''}
                  authorName={post.author.fullName || ''}
                  authorThumbnail=""
                  isFollower
                  isLike
                />
              ))}
              <StyledObserver ref={refInView} />
            </StyledPostCardList>
          ) : (
            <StyledNoPost>페이지가 없습니다.</StyledNoPost>
          )}
        </StyledMainContentContainer>
        <UserManager />
      </StyledWrapper>
    </>
  );
};

export default HomePage;
