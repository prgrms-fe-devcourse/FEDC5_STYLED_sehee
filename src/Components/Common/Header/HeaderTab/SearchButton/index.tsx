import { useState } from 'react';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import SearchModal from '@/Components/Common/Modal/SearchModal';

const SearchButton = ({ ...props }) => {
  const [search, setSearch] = useState(false);

  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={() => setSearch(true)}
    >
      <Icon
        name="search"
        isFill={false}
        {...props}
      />
      {search && (
        <SearchModal
          onChangeOpen={() => {
            setSearch(false);
          }}
        />
      )}
    </Button>
  );
};

export default SearchButton;
