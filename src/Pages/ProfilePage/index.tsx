/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useParams } from 'react-router-dom';
import { StyledBackground, StyledHeaderContainer } from './style';
import ProfilePost from '@/Components/Profile/ProfilePost';
/* eslint-disable no-underscore-dangle */
import useFetchUser from '@/Hooks/Api/User';
import useCheckAuth from '@/Hooks/Api/Auth';
import ProfileInfo from '@/Components/Profile/ProfileInfo';

const ProfilePage = () => {
  const { userId } = useParams() || ''; // URL에서 사용자 ID를 가져오기

  const { loginUserData } = useCheckAuth();
  const { userData: profileUser, userDataRefetch } = useFetchUser(userId || '');

  if (!profileUser) {
    // 프로필 사용자 정보를 가져오지 못한 경우
    return null;
  }

  const isMyProfile = !loginUserData // 로그인 안한 경우
    ? false
    : loginUserData._id === profileUser._id;

  const isFollowingUser =
    !loginUserData || !loginUserData.following
      ? null
      : loginUserData.following.find(
          // eslint-disable-next-line no-underscore-dangle
          (following) => following.user === profileUser._id,
        );

  return (
    <>
      <StyledHeaderContainer />
      <StyledBackground>
        <ProfileInfo
          userData={profileUser}
          isMyProfile={isMyProfile}
          userDataRefetch={userDataRefetch}
          isFollowing={isFollowingUser}
        />
        <ProfilePost
          userData={profileUser}
          isMyProfile={isMyProfile}
        />
      </StyledBackground>
      <Outlet />
    </>
  );
};

export default ProfilePage;
