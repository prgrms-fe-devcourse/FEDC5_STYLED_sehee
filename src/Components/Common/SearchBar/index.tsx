import Icon from '@/Components/Base/Icon';
import { StyledContainer, StyledInput } from './style';
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
      <StyledInput
        {...inputProps}
        onChange={onChangehandler}
      />
      <Button
        backgroundColor="transparent"
        hoverBackgroundColor="transparent"
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
