import { ForwardedRef, forwardRef } from 'react';
import {
  StyledWrapper,
  StyledInput,
  StyledLabel,
  StyledErrorMessage,
  StyledContainer,
} from './style';
import Props from './type';

const Input = forwardRef(
  (
    { label, block = false, wrapperProps, errorMessage, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
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
          ref={ref}
          {...props}
        />
      </StyledWrapper>
    );
  },
);

Input.displayName = 'Input';

export default Input;
