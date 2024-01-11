import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import ProfileInfo from './ProfileInfo';
import ProfilePost from './ProfilePost';
import { checkAuth } from '@/Services/Auth';
import { getUser } from '@/Services/User';
import { UserType } from '@/Types/UserType';
import { StyledBackground, StyledHeaderContainer } from './style';

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

  useEffect(() => {
    currentUserQuery.refetch();
    profileUserQuery.refetch();
  }, [userId, currentUserQuery, profileUserQuery]);

  const currentUser = currentUserQuery.data;
  const profileUser = profileUserQuery.data;

  if (!profileUser) {
    // 프로필 사용자 정보를 가져오지 못한 경우
    return null;
  }

  const isCurrentUserProfile = !currentUser // 로그인 안한 경우
    ? false
    : // eslint-disable-next-line no-underscore-dangle
      currentUser._id === profileUser._id;

  return (
    <>
      <StyledHeaderContainer />
      <StyledBackground>
        <ProfileInfo
          userData={profileUser}
          myprofile={isCurrentUserProfile}
        />

        <ProfilePost
          userData={profileUser}
          myprofile={isCurrentUserProfile}
        />
      </StyledBackground>
    </>
  );
};

export default ProfilePage;
