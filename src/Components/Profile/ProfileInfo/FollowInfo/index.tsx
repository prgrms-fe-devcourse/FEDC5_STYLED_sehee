import { UserType } from '@/Types/UserType';
import { StyledFollow, StyledPost, StyledFollowContainer } from './style';
import { Props } from './type';

const FollowInfo = ({ user }: { user: UserType }) => {
  console.log(user);
  return (
    <StyledFollowContainer>
      <StyledPost>게시물 {user.posts.length}</StyledPost>
      <StyledFollow onClick={() => console.log('follower')}>
        팔로워 {user.followers.length || 0}
      </StyledFollow>
      <StyledFollow onClick={() => console.log('following')}>
        팔로잉 {user.following.length || 0}
      </StyledFollow>
    </StyledFollowContainer>
  );
};

export default FollowInfo;
