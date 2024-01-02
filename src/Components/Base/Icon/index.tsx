import { forwardRef, ForwardedRef } from 'react';
import StyledIconContainer from './style';
import IconProps from './type';

/**
 * 채워지지 않은 아이콘 => className = 'material-symbols-outlined'로 지정
 */
const Icon = forwardRef(
  (
    { name, className = 'material-icons', ...props }: IconProps,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    return (
      <StyledIconContainer
        {...props}
        ref={ref}
        className={className}
      >
        {name}
      </StyledIconContainer>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
