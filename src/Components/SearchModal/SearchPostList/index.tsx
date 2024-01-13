import Spinner from '@/Components/Base/Spinner';
import { StyledWrapper, StyledContainer, StyledNoContent } from './style';
import Props from './type';

const SearchPostList = ({ data }: Props) => {
  return (
    <StyledWrapper>
      {data ? (
        data.map((post) => (
          <StyledContainer key={post._id}>{post.title}</StyledContainer>
        ))
      ) : (
        <StyledNoContent>텅..</StyledNoContent>
      )}
    </StyledWrapper>
  );
};

export default SearchPostList;
