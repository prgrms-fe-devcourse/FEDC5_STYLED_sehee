import React, { useEffect, useRef, useState } from 'react';
import { Props } from './type';
import { StyledWrapper, StyledTextArea } from './style';

const TitleEditor = ({ onEditing, initialValue }: Props) => {
  const [value, setValue] = useState('');
  const $ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // TODO: 글자 수 제한 둘 것인지?
    const newValue = event.target.value;
    setValue(newValue);
    onEditing(newValue);
  };

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    $ref.current?.focus();
  }, []);

  return (
    <StyledWrapper>
      <StyledTextArea
        ref={$ref}
        placeholder="내용을 입력해주세요."
        value={value}
        onChange={handleChange}
      />
    </StyledWrapper>
  );
};

export default TitleEditor;
