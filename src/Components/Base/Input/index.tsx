import { useEffect, useRef } from 'react';
import { StyledWrapper, StyledInput, StyledLabel } from './style';
import Props from './type';

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
    <StyledWrapper
      $block={block}
      {...wrapperProps}
    >
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        $invalid={invalid}
        ref={inputRef}
        {...props}
      />
    </StyledWrapper>
  );
};

export default Input;
