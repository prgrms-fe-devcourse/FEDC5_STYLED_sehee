import { forwardRef, ForwardedRef } from 'react';
import StyledIconContainer from './style';
import IconProps from './type';

const Icon = forwardRef(
  (
    { name, isFill = true, className = '', ...props }: IconProps,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    return (
      <StyledIconContainer
        {...props}
        ref={ref}
        className={
          isFill
            ? `material-icons ${className}`
            : `material-symbols-outlined  ${className}`
        }
      >
        {name}
      </StyledIconContainer>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
