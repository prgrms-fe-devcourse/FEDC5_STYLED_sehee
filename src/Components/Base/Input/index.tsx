import { useEffect, useRef } from 'react';
import {
  StyledWrapper,
  StyledInput,
  StyledLabel,
  StyledErrorMessage,
  StyledContainer,
} from './style';
import Props from './type';

const Input = ({
  label,
  initialFocus = false,
  block = false,
  wrapperProps,
  errorMessage,
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
      <StyledContainer>
        {label && <StyledLabel>{label}</StyledLabel>}
        {errorMessage && (
          <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        )}
      </StyledContainer>
      <StyledInput
        $invalid={!!errorMessage}
        ref={inputRef}
        {...props}
      />
    </StyledWrapper>
  );
};
export default Input;
