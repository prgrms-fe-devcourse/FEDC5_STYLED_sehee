import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { StyledFollow, StyledPost, StyledFollowContainer } from './style';
import FollowModal from '@/Components/FollowModal';
import useAuthUserStore from '@/Stores/AuthUser';
import { checkAuth } from '@/Services/Auth';
import { Props } from './type';

const FollowInfo = ({ userData, userDataRefetch }: Props) => {
  const [mode, setMode] = useState<'follower' | 'following'>('follower');
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const { setAuthUser, user } = useAuthUserStore();

  const {
    data,
    isSuccess,
    refetch: loginUserRefetch,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: checkAuth,
  });

  useEffect(() => {
    if (!isSuccess) return;
    if (isSuccess && !data) {
      return;
    }
    if (isSuccess && data) {
      setAuthUser(data);
    }
  }, [isSuccess, data, setAuthUser]);

  const handleClick = (type: 'follower' | 'following') => {
    setMode(type);
    setIsFollowModalOpen(true);
  };

  useEffect(() => {
    loginUserRefetch();
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
