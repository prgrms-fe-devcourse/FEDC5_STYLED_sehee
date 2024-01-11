import { StyledFollow, StyledPost, StyledFollowContainer } from './style';
import { Props } from './type';

const FollowInfo = ({ posts, followers, following }: Props) => {
  return (
    <StyledFollowContainer>
      <StyledPost>게시물 {posts}</StyledPost>
      <StyledFollow onClick={() => console.log('follower')}>
        팔로워 {followers || 0}
      </StyledFollow>
      <StyledFollow onClick={() => console.log('following')}>
        팔로잉 {following || 0}
      </StyledFollow>
    </StyledFollowContainer>
  );
};

export default FollowInfo;
