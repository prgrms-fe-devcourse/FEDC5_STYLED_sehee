import React, { ForwardedRef, forwardRef, useState } from 'react';
import { useTheme } from 'styled-components';
import type { DropDownProps } from './type';
import {
  StyledDropDown,
  StyledDropDownButton,
  StyledDropDownItem,
  StyledDropDownOption,
  StyledLabel,
} from './style';
import Icon from '@/Components/Base/Icon';

const DropDown = forwardRef(
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
      ...props
    }: DropDownProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const theme = useTheme();
    const [selectedOption, setSelectedOption] = useState('선택 없음');
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: string) => {
      setSelectedOption(option);
      if (onSelect) {
        onSelect(option);
      }
      setIsOpen(false);
    };

    const handleCancel = (event: React.MouseEvent) => {
      event.stopPropagation();
      handleSelect('선택 없음');
    };

    return (
      <StyledDropDown
        ref={ref}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
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
        <StyledDropDownButton
          onClick={() => setIsOpen(!isOpen)}
          $width={width || '160px'}
          $height={height || '40px'}
          $backgroundColor={backgroundColor || theme.colors.background}
          $textColor={textColor || theme.colors.text}
          $textSize={textSize || theme.size.medium}
          {...buttonProps}
        >
          {selectedOption}
          {selectedOption === '선택 없음' ? (
            <Icon
              name="expand_circle_down"
              isFill
              onClick={() => handleSelect(selectedOption)}
              style={{ color: textColor }}
            />
          ) : (
            <Icon
              name="cancel"
              isFill
              onClick={handleCancel}
              style={{ color: textColor }}
            />
          )}
        </StyledDropDownButton>

        {isOpen && (
          <StyledDropDownOption
            $width={width || '160px'}
            {...optionProps}
          >
            {options.map((option) => (
              <StyledDropDownItem
                key={option}
                onClick={() => handleSelect(option)}
                $itemBackgroundColor={
                  itemBackgroundColor || theme.colors.lightGray
                }
                $itemTextColor={itemTextColor || theme.colors.text}
                $itemTextSize={itemTextSize || theme.size.small}
                $width={width || '160px'}
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

DropDown.displayName = 'DropDown';

export default DropDown;
