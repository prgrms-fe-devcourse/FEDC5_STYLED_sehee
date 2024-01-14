/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [follows, setFollows] = useState<UserType[]>([]);
  const [searchFollows, setSearchFollows] = useState<UserType[]>(follows);
  const [isMobileSize, setIsMobileSize] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

    // 일관된 순서를 보장하기 위해 유저 생성 날짜 기준으로 정렬
    fetchedFollows.sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    );
    setFollows(fetchedFollows);
    setSearchFollows(fetchedFollows);

    // 검색어의 유무에 따른 최종 결과를 보여준다.
    if (!inputRef || !inputRef.current) {
      return;
    }
    search(inputRef.current.value, fetchedFollows);

    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [mode, userData]);

  useEffect(() => {
    fetchFollowData();
  }, [userData, mode, fetchFollowData, isLoading]);

  //   디바운싱을 이용해 onChange 성능을 개선한다.
  const debouncedSearch = useMemo(
    () =>
      debounce(async () => {
        if (!inputRef || !inputRef.current) {
          return;
        }

        const query = inputRef.current.value.trim();
        search(query, follows);

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 500),
    [follows],
  );

  const handleInputChange = () => {
    setIsLoading(true);
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
      await followUser(user._id);
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

  return (
    <Modal
      height={60}
      width={isMobileSize ? 80 : 40}
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
          {isLoading || !userData ? (
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
                isSelf={user._id === loginUser._id}
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
