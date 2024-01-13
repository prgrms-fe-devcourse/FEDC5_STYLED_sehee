import { useNavigate } from 'react-router-dom';
import Avatar from '@/Components/Base/Avatar';
import { StyledWrapper, StyledContainer, StyledNoContent } from './style';
import Props from './type';

const SearchUserList = ({ data }: Props) => {
  const navigator = useNavigate();

  const handleUserClick = (userId: string) => {
    navigator(`/profile/${userId}`);
  };

  return (
    <StyledWrapper>
      {data ? (
        data.map((user) => (
          <StyledContainer
            key={user._id}
            onClick={() => handleUserClick(user._id)}
          >
            <Avatar
              size={30}
              src={
                user.image
                  ? user.image
                  : 'https://user-images.githubusercontent.com/17202261/101670093-195d9180-3a96-11eb-9bd4-9f31cbe44aea.png'
              }
            />
            <h1>{user.fullName}</h1>
            <p> {user.email}</p>
          </StyledContainer>
        ))
      ) : (
        <StyledNoContent>텅..</StyledNoContent>
      )}
    </StyledWrapper>
  );
};

export default SearchUserList;
