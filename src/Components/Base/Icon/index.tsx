import { forwardRef, ForwardedRef } from 'react';
import StyledIconContainer from './style';
import IconProps from './type';

/**
 * 채워지지 않은 아이콘 => className = 'material-symbols-outlined'로 지정
 */
const Icon = forwardRef(
  (
    { name, isFill = true, ...props }: IconProps,
    ref: ForwardedRef<HTMLSpanElement>,
  ) => {
    return (
      <StyledIconContainer
        {...props}
        ref={ref}
        className={isFill ? 'material-icons' : 'material-symbols-outlined'}
      >
        {name}
      </StyledIconContainer>
    );
  },
);

Icon.displayName = 'Icon';

export default Icon;
