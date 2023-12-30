import Icon from '@/Components/Base/Icon';
import Input from '@/Components/Base/Input';
import StyledContainer from './style';

const SearchBar = () => {
  return (
    <StyledContainer>
      <Input />
      <button type="button">
        <Icon name="search" />
      </button>
    </StyledContainer>
  );
};

export default SearchBar;
