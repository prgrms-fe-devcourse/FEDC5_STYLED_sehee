import { useEffect, useState } from 'react';
import { StyledFollow, StyledPost, StyledFollowContainer } from './style';
import FollowModal from '@/Components/FollowModal';
import useAuthUserStore from '@/Stores/AuthUser';
import { Props } from './type';
import useCheckAuth from '@/Hooks/Api/Auth';

const FollowInfo = ({ userData, userDataRefetch }: Props) => {
  const [mode, setMode] = useState<'follower' | 'following'>('follower');
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const { user, setAuthUser } = useAuthUserStore();

  const { loginUserData, isCheckAuthSuccess, loginUserRefetch } =
    useCheckAuth();

  useEffect(() => {
    if (!isCheckAuthSuccess) return;
    if (isCheckAuthSuccess && !loginUserData) {
      return;
    }
    if (isCheckAuthSuccess && loginUserData) {
      setAuthUser(loginUserData);
    }
  }, [isCheckAuthSuccess, loginUserData, setAuthUser]);

  const handleClick = (type: 'follower' | 'following') => {
    setMode(type);
    setIsFollowModalOpen(true);
  };

  useEffect(() => {
    loginUserRefetch();
    // userRefetch();
    userDataRefetch();
  }, [isFollowModalOpen, loginUserRefetch, userDataRefetch]);

  return (
    <StyledFollowContainer>
      <StyledPost>게시물 {userData.posts.length}</StyledPost>
      <StyledFollow onClick={() => handleClick('follower')}>
        팔로워 {userData.followers.length || 0}
      </StyledFollow>
      <StyledFollow onClick={() => handleClick('following')}>
        팔로잉 {userData.following.length || 0}
      </StyledFollow>
      {isFollowModalOpen && (
        <FollowModal
          userData={userData}
          mode={mode}
          loginUser={user}
          loginUserRefetch={loginUserRefetch}
          onChangeOpen={setIsFollowModalOpen}
        />
      )}
    </StyledFollowContainer>
  );
};

export default FollowInfo;
