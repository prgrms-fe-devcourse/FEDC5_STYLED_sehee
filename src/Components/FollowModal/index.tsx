/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import Input from '../Base/Input';
import Modal from '../Common/Modal';
import UserCard from '../Common/UserCard';
import DirectMessageSkeleton from '../DirectMessage/Skeleton';
import { StyledBody, StyledContainer, StyledHeader } from './style';
import { FollowModalProps } from './type';
import { UserType } from '@/Types/UserType';
import { followUser, unfollowUser } from '@/Services/Follow';
import { getUser, getUsers } from '@/Services/User';
import { checkAuth } from '@/Services/Auth';

/**
 * 헤딩 유저의 팔로잉 또는 팔로우 정보를 가져올 거임
 */
const FollowModal = ({
  //   follows,
  //   setFollows,
  userData,
  mode,
  loginUser,
  onChangeOpen,
}: FollowModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [follows, setFollows] = useState<UserType[]>([]);

  if (mode === 'following') {
    userData.following.map(async ({ user }) => {
      const data = await getUser(user);
      if (!data) return;
      setFollows([...follows, data]);
    });
  } else {
    userData.followers.map(async ({ user }) => {
      const data = await getUser(user);
      if (!data) return;
      setFollows([...follows, data]);
    });
  }

  //   디바운싱을 이용해 onChange 성능을 개선한다.
  const debouncedSearch = useMemo(
    () =>
      debounce(async () => {
        if (!inputRef || !inputRef.current) {
          return;
        }
        const query = inputRef.current.value.trim();
        setSearchQuery(query);
      }, 500),
    [],
  );

  const handleInputChange = () => {
    setIsLoading(true);
    debouncedSearch();
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleFollow = async (user: UserType) => {
    // 팔로우 중인지 체크
    if (!loginUser) return;
    const following = loginUser.following?.find(
      (follow) => follow.user === user._id,
    );
    // 이미 팔로우 중이면 언팔로우
    if (following) {
      console.log('언팔');
      await unfollowUser(following._id);
    } else {
      console.log('팔로우');
      // 아직 팔로우 안했으면 팔로우
      await followUser(user._id);
    }

    // 다시 getUser(loginUser._id)해서 받아온 다음에 거기에 있는 follows로 업데이트
    // if (loginUser?._id) {
    //   const newUserData = await getUsers(loginUser?._id);
    //   newUserData.fo
    // }

    // const newData = await getUsers();
    // if (!newData) return;
    // const filterData = newData.filter(
    //   (userData) => userData._id !== loginUser._id,
    // );
    // // console.log(loginUser);
    // setFollows(filterData);
    // const newLoginUser = await checkAuth();
    // if (!newLoginUser) return;
    // loginUser = newLoginUser;
  };

  return (
    <Modal
      height={60}
      width={40}
      onChangeOpen={onChangeOpen}
    >
      <StyledContainer>
        <StyledHeader>{mode === 'follower' ? '팔로워' : '팔로잉'}</StyledHeader>
        <Input
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="유저 이름으로 검색하세요."
        />
        <StyledBody>
          {(isLoading || !userData) && <DirectMessageSkeleton.UserCard />}
          {(
            mode === 'following'
              ? userData.following.length === 0
              : userData.followers.length === 0
          ) ? (
            <div>계정을 찾을 수 없습니다.</div>
          ) : (
            follows.map((user) => (
              <div key={user._id}>
                <UserCard
                  mode="follow"
                  coverImageUrl={user.image}
                  avatarSize={40}
                  userName={user.fullName}
                  userNameSize="1.5rem"
                  userDetail={user.email}
                  isFollow={
                    loginUser?.following?.find((following) =>
                      user.followers.includes(following._id),
                    ) != null
                  } // {mode === 'following'} 이거는 그냥 팔로우하는 사람 맞는지 계속 체크..
                  onFollowClick={() => handleFollow(user)}
                />
              </div>
            ))
          )}
        </StyledBody>
      </StyledContainer>
    </Modal>
  );
};

export default FollowModal;
