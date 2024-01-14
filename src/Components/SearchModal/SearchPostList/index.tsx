import { useNavigate } from 'react-router-dom';
import { StyledWrapper, StyledContainer, StyledNoContent } from './style';
import Props from './type';
import { convertUtcToKstDate } from '@/Utils/UTCtoKST';

const SearchPostList = ({ data }: Props) => {
  const navigator = useNavigate();

  const handlePostClick = (postId: string) => {
    navigator(`/modal-detail/${postId}`);
  };
  return (
    <StyledWrapper>
      {data ? (
        data.map((post) => (
          <StyledContainer
            key={post._id}
            onClick={() => handlePostClick(post._id)}
          >
            <h1>{post.title}</h1>
            <p> {convertUtcToKstDate(post.createdAt)}</p>
          </StyledContainer>
        ))
      ) : (
        <StyledNoContent>텅..</StyledNoContent>
      )}
    </StyledWrapper>
  );
};

export default SearchPostList;
