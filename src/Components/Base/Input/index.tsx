/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useRef } from 'react';
import { Wrapper, StyledInput, Label } from './Style';
import Props from './Type';

const Input = ({
  label,
  initialFocus = false,
  invalid = false,
  block = false,
  wrapperProps,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialFocus]);

  return (
    <Wrapper
      $block={block}
      {...wrapperProps}
    >
      {label && <Label>{label}</Label>}
      <StyledInput
        $invalid={invalid}
        ref={inputRef}
        {...props}
      />
    </Wrapper>
  );
};

export default Input;
