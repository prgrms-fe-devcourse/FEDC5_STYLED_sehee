import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';

import Props from './type';
import Button from '@/Components/Base/Button';
import { StyledForm, StyledInput } from './style';
import Icon from '@/Components/Base/Icon';
import Alert from '@/Components/Common/Alert';

const SearchBar = ({ onSubmit }: Props) => {
  const theme = useTheme();
  const $ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue) {
      setErrorMessage('검색어를 입력해주세요.');
      return;
    }

    onSubmit(inputValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    $ref.current?.focus();
  }, []);

  return (
    <>
      {errorMessage && (
        <Alert
          message={errorMessage}
          onChangeOpen={() => setErrorMessage(null)}
        />
      )}
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          ref={$ref}
          placeholder="검색어를 입력해주세요"
          value={inputValue}
          onChange={handleChange}
        />
        <Button
          width="30px"
          height="30px"
          backgroundColor={theme.colors.background}
        >
          <Icon
            name="search"
            color="white"
          />
        </Button>
      </StyledForm>
    </>
  );
};

export default SearchBar;
