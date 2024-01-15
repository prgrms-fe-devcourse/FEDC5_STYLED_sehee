import { ForwardedRef, forwardRef, useState } from 'react';
import { useTheme } from 'styled-components';
import type { DropDownProps } from './type';
import {
  StyledDropDown,
  StyledDropDownItem,
  StyledDropDownOption,
  StyledLabel,
} from './style';

/**
 * @param options 출력할 옵션들을 배열([])형태로 담아 전달해주세요. (필수)
 * 이 외의 프롭들은 선택적으로 전달해줄 수 있으며, px / rem 등의 단위가 포함된 String 형태로 전달해주세요.
 */

const DropDownOnlyOption = forwardRef(
  (
    {
      children,
      options,
      label,
      labelTextColor,
      labelTextSize,
      width,
      height,
      backgroundColor,
      textColor,
      textSize,
      itemBackgroundColor,
      itemTextColor,
      itemTextSize,
      onSelect,
      buttonProps,
      optionProps,
      itemProps,
      labelProps,
      isShow = true,
      initialValue,
      ...props
    }: DropDownProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const theme = useTheme();

    const handleSelect = (option: string) => {
      if (onSelect) {
        onSelect(option);
      }
    };

    return (
      <StyledDropDown
        ref={ref}
        {...props}
      >
        {label && (
          <StyledLabel
            $labelTextColor={labelTextColor || theme.colors.text}
            $labelTextSize={labelTextSize || '1.2rem'}
            $backgroundColor={backgroundColor || theme.colors.background}
            {...labelProps}
          >
            {label}
          </StyledLabel>
        )}

        {isShow && (
          <StyledDropDownOption
            $width={width || '16rem'}
            {...optionProps}
          >
            {options.map((option) => (
              <StyledDropDownItem
                key={option}
                onClick={() => handleSelect(option)}
                $itemBackgroundColor={
                  itemBackgroundColor || theme.colors.lightGray
                }
                $itemTextColor={itemTextColor || theme.colors.black}
                $itemTextSize={itemTextSize || theme.size.medium}
                $width={width || '16rem'}
                {...itemProps}
              >
                {option}
              </StyledDropDownItem>
            ))}
          </StyledDropDownOption>
        )}
      </StyledDropDown>
    );
  },
);

DropDownOnlyOption.displayName = 'DropDownOnlyOption';

export default DropDownOnlyOption;
