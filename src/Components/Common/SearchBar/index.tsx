import Icon from '@/Components/Base/Icon';
import Input from '@/Components/Base/Input';
import StyledContainer from './style';
import Button from '@/Components/Base/Button';
import SearchProps from './type';

const SearchBar = ({
  onChangehandler,
  onSubmithandler,
  iconProps,
  inputProps,
  ...props
}: SearchProps) => {
  return (
    <StyledContainer
      {...props}
      onSubmit={onSubmithandler}
    >
      <Input
        {...inputProps}
        onChange={onChangehandler}
      />
      <Button
        backgroundColor="transparent"
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
