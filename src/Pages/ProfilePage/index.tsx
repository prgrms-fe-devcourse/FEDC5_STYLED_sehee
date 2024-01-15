import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { checkAuth } from '@/Services/Auth';
import { getUser } from '@/Services/User';
import { UserType } from '@/Types/UserType';
import { StyledBackground, StyledHeaderContainer } from './style';
import ProfileInfo from '@/Components/Profile/ProfileInfo';
import ProfilePost from '@/Components/Profile/ProfilePost';

const ProfilePage = () => {
  const { userId } = useParams() || ''; // URL에서 사용자 ID를 가져오기

  const currentUserQuery: UseQueryResult<UserType, unknown> = useQuery({
    queryKey: ['currentUser'],
    queryFn: checkAuth,
  });
  const profileUserQuery: UseQueryResult<UserType, unknown> = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId || ''),
  });

  const currentUser = currentUserQuery.data;
  const profileUser = profileUserQuery.data;

  useEffect(() => {
    currentUserQuery.refetch();
    profileUserQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, currentUser]);

  if (!profileUser) {
    // 프로필 사용자 정보를 가져오지 못한 경우
    return null;
  }

  const isCurrentUserProfile = !currentUser // 로그인 안한 경우
    ? false
    : // eslint-disable-next-line no-underscore-dangle
      currentUser._id === profileUser._id;

  const isFollowingUser =
    !currentUser || !currentUser.following
      ? null
      : currentUser.following.find(
          // eslint-disable-next-line no-underscore-dangle
          (following) => following.user === profileUser._id,
        );

  return (
    <>
      <StyledHeaderContainer />
      <StyledBackground>
        <ProfileInfo
          userData={profileUser}
          isMyProfile={isCurrentUserProfile}
          isFollowing={isFollowingUser}
        />
        <ProfilePost
          userData={profileUser}
          isMyProfile={isCurrentUserProfile}
        />
      </StyledBackground>
      <Outlet />
    </>
  );
};

export default ProfilePage;
