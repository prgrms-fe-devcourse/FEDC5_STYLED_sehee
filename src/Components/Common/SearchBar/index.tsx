import Icon from '@/Components/Base/Icon';
import Input from '@/Components/Base/Input';
import StyledContainer from './style';
import Button from '@/Components/Base/Button';

const SearchBar = () => {
  const onSearch = () => {
    alert('hi');
  };

  return (
    <StyledContainer>
      <Input />
      <Button
        onClickButton={onSearch}
        backgroundColor="transparent"
        color="black"
        width="fit-content"
      >
        <Icon name="search" />
      </Button>
    </StyledContainer>
  );
};

export default SearchBar;
