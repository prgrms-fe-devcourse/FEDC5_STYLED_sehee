import Icon from '@/Components/Base/Icon';
import Input from '@/Components/Base/Input';
import StyledContainer from './style';
import Button from '@/Components/Base/Button';
import SearchProps from './type';

const SearchBar = ({ onChange, onClick, iconProps, ...props }: SearchProps) => {
  return (
    <StyledContainer>
      <Input
        {...props}
        onChange={onChange}
      />
      <Button
        onClickButton={onClick}
        backgroundColor="transparent"
        color="black"
        width="fit-content"
        type="submit"
      >
        <Icon
          name="search"
          {...iconProps}
        />
      </Button>
    </StyledContainer>
  );
};

export default SearchBar;
