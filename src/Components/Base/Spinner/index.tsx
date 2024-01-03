import { forwardRef, ForwardedRef } from 'react';
import { useTheme } from 'styled-components';
import { StyledBackground, StyledSpinner } from './style';
import { SpinnerProp } from './type';

/**
 * @param size: 원하시는 크기를 Number 타입으로 전달해주세요 (선택)
 * @param color, display: 원하시는 색상과 출력 모드를 String 타입으로 전달해주세요 (선택)
 * @param isFixedCenter, isBackground: 중앙고정, 검은색 배경 여부를 Boolean 타입으로 전달해주세요 (선택, default="false")
 */

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
