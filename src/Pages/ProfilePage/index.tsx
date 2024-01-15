/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StyledBackground, StyledHeaderContainer } from './style';
import ProfileInfo from '@/Components/Profile/ProfileInfo';
import ProfilePost from '@/Components/Profile/ProfilePost';
import useFetchUser from '@/Hooks/Api/User';
import useCheckAuth from '@/Hooks/Api/Auth';

const ProfilePage = () => {
  const { userId } = useParams() || ''; // URL에서 사용자 ID를 가져오기

  const { loginUserData, loginUserRefetch } = useCheckAuth();
  const { userData: profileUser, userDataRefetch } = useFetchUser(userId || '');

  useEffect(() => {
    loginUserRefetch();
    userDataRefetch();
  }, [userId, loginUserRefetch, userDataRefetch]);

  if (!profileUser) {
    // 프로필 사용자 정보를 가져오지 못한 경우
    return null;
  }

  const isMyProfile = !loginUserData // 로그인 안한 경우
    ? false
    : loginUserData._id === profileUser._id;

  return (
    <>
      <StyledHeaderContainer />
      <StyledBackground>
        <ProfileInfo
          userData={profileUser}
          userDataRefetch={userDataRefetch}
          isMyProfile={isMyProfile}
        />
        <ProfilePost
          userData={profileUser}
          isMyProfile={isMyProfile}
        />
      </StyledBackground>
    </>
  );
};

export default ProfilePage;
