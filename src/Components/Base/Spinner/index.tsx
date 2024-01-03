import { forwardRef, ForwardedRef } from 'react';
import { useTheme } from 'styled-components';
import { StyledBackground, StyledSpinner } from './style';
import { SpinnerProp } from './type';

const Spinner = forwardRef(
  (
    {
      size,
      color,
      display,
      isFixedCenter,
      isBackground,
      backgroundProps,
      ...props
    }: SpinnerProp,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const theme = useTheme();
    return (
      <span>
        <StyledBackground
          $isBackground={isBackground || false}
          {...backgroundProps}
        />
        <StyledSpinner
          $size={size || 100}
          $color={color || theme.colors.text}
          $display={display || 'inline-block'}
          $isFixedCenter={isFixedCenter || false}
          ref={ref}
          {...props}
        >
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </StyledSpinner>
      </span>
    );
  },
);

Spinner.displayName = 'Spinner';

export default Spinner;
