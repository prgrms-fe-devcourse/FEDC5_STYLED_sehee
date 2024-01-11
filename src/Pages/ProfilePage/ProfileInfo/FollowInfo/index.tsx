import Button from '@/Components/Base/Button';
import { StyledFollow, StyledFollowContainer } from './style';
import { Props } from './type';

const FollowInfo = ({ posts, followers, following }: Props) => {
  return (
    <StyledFollowContainer>
      <StyledFollow>게시물 {posts}</StyledFollow>
      <Button
        backgroundColor="transparent"
        width="fit-content"
        type="button"
        hoverBackgroundColor="transparent"
        hoverTextColor="transparent"
        borderRadius="0"
      >
        <StyledFollow>팔로워 {followers}</StyledFollow>
      </Button>
      <Button
        backgroundColor="transparent"
        width="fit-content"
        type="button"
        hoverBackgroundColor="transparent"
        hoverTextColor="transparent"
        borderRadius="0"
      >
        <StyledFollow>팔로잉 {following}</StyledFollow>
      </Button>
    </StyledFollowContainer>
  );
};

export default FollowInfo;
