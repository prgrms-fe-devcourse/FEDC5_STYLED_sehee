import { StyledWrapper, StyledContainer, StyledNoContent } from './style';
import Props from './type';

const SearchUserList = ({ data }: Props) => {
  return (
    <StyledWrapper>
      {data ? (
        data.map((user) => (
          <StyledContainer key={user._id}>{user.fullName}</StyledContainer>
        ))
      ) : (
        <StyledNoContent>텅..</StyledNoContent>
      )}
    </StyledWrapper>
  );
};

export default SearchUserList;
