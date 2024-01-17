/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Base/Input';
import Modal from '../Common/Modal';
import UserCard from '../Common/UserCard';
import DirectMessageSkeleton from '../DirectMessage/Skeleton';
import { StyledBody, StyledContainer, StyledHeader } from './style';
import { FollowModalProps } from './type';
import { UserType } from '@/Types/UserType';
import { followUser, unfollowUser } from '@/Services/Follow';
import { getUser } from '@/Services/User';
import { sendNotifications } from '@/Services/Notification';
import useResize from '@/Hooks/useResize';
import useDebouncedSearch from '@/Hooks/useDebouncedSearch';
import useIsTyping from '@/Hooks/useIsTyping';

/**
 * @param userData 해당 유저의 UserType 데이터
 * @param loginUser 현재 로그인 한 유저의 UserType 데이터
 */
const FollowModal = ({
  userData,
  mode,
  loginUser,
  loginUserRefetch,
  onChangeOpen,
}: FollowModalProps) => {
  const navigator = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [follows, setFollows] = useState<UserType[]>([]);
  const [searchFollows, setSearchFollows] = useState<UserType[]>(follows);

  const { isMobileSize } = useResize();
  const { inputRef, isTyping } = useIsTyping();

  const search = (query: string, fetchedFollows: UserType[]) => {
    // 검색 중인 단어가 없다면 전체 팔로우 목록을 보여준다.
    if (query.trim().length === 0) {
      setSearchFollows(fetchedFollows);
      return;
    }

    const newFollows = fetchedFollows.filter((user) =>
      user.fullName.includes(query.trim()),
    );
    setSearchFollows(newFollows);
  };

  const debouncedSearch = useDebouncedSearch({
    inputRef,
    follows,
    callback: search,
  });

  const fetchFollowData = useCallback(async () => {
    const userIds: string[] = [];

    if (mode === 'following') {
      userData.following.map(({ user }) => userIds.push(user));
    } else {
      userData.followers.map(({ follower }) => userIds.push(follower));
    }

    const fetchedFollows: UserType[] = [];

    await Promise.all(
      userIds.map(async (userId) => {
        const data = await getUser(userId);
        if (data) {
          fetchedFollows.push(data);
        }
      }),
    );

    // 일관된 순서를 보장하기 위해 이름 순으로 정렬
    fetchedFollows.sort((a, b) => a.fullName.localeCompare(b.fullName));
    setFollows(fetchedFollows);
    setSearchFollows(fetchedFollows);

    // 검색어의 유무에 따른 최종 결과를 보여준다.
    if (!inputRef || !inputRef.current) {
      return;
    }
    search(inputRef.current.value, fetchedFollows);

    setIsLoading(false);
  }, [mode, userData, inputRef]);

  useEffect(() => {
    fetchFollowData();
  }, [userData, mode, fetchFollowData]);

  const handleInputChange = () => {
    debouncedSearch();
  };

  const handleFollow = async (user: UserType) => {
    if (!loginUser || !loginUser.following) return;
    // 팔로우 중인지 체크
    const followingData = loginUser.following.find(
      (data) => data.user === user._id,
    );
    // 이미 팔로우 중이면 언팔로우
    if (followingData) {
      await unfollowUser(followingData._id);
    }
    // 아직 팔로우 안했으면 팔로우
    else {
      const data = await followUser(user._id);
      if (!data) return;
      await sendNotifications({
        notificationType: 'FOLLOW',
        notificationTypeId: data._id,
        userId: user._id,
        postId: null,
      });
    }

    loginUserRefetch();
    await fetchFollowData();
  };

  const handleClickUser = (userId: string) => {
    navigator(`/profile/${userId}`);
    onChangeOpen(false);
  };

  const isFollowing = (user: UserType) => {
    if (!loginUser || !loginUser.following) return false;
    return loginUser.following.some((following) => following.user === user._id);
  };

  const isButtonShow = (userId: string) => {
    // 로그인 안 한 경우에도 보이지 않도록 만든다.
    if (Object.keys(loginUser).length === 0) return false;
    return userId !== loginUser._id;
  };

  return (
    <Modal
      height={60}
      width={isMobileSize ? 80 : 50}
      onChangeOpen={onChangeOpen}
    >
      <StyledContainer>
        <StyledHeader>
          {mode === 'following' ? '팔로잉' : '팔로워'}
        </StyledHeader>
        <Input
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="유저 이름으로 검색하세요."
        />
        <StyledBody>
          {isLoading || isTyping || !userData ? (
            <DirectMessageSkeleton.UserCard length={6} />
          ) : searchFollows.length === 0 ? (
            <div>텅..</div>
          ) : (
            searchFollows.map((user) => (
              <UserCard
                key={user._id}
                mode="follow"
                coverImageUrl={user.image}
                avatarSize={isMobileSize ? 30 : 40}
                userName={user.fullName}
                userNameSize={isMobileSize ? '1.2rem' : '1.5rem'}
                userDetail={user.email}
                isFollow={isFollowing(user)}
                isButtonShow={isButtonShow(user._id)}
                onClick={() => handleClickUser(user._id)}
                onClickFollowBtn={() => handleFollow(user)}
              />
            ))
          )}
        </StyledBody>
      </StyledContainer>
    </Modal>
  );
};

export default FollowModal;
