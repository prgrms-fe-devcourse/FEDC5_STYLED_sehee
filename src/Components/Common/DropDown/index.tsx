import React, { ForwardedRef, forwardRef, useState } from 'react';
import type { DropDownProps } from './type';
import {
  StyledDropDown,
  StyledDropDownButton,
  StyledDropDownItem,
  StyledDropDownOption,
} from './style';
import Icon from '@/Components/Base/Icon';

const DropDown = forwardRef(
  (
    {
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
      ...props
    }: DropDownProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
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
        <StyledDropDownButton
          onClick={() => setIsOpen(!isOpen)}
          {...buttonProps}
        >
          {selectedOption}
          <Icon
            name="cancel"
            isFill={false}
            onClick={handleCancel}
            style={{ color: textColor }}
          />
        </StyledDropDownButton>
        {isOpen && (
          <StyledDropDownOption
            $size={width || '160px'}
            {...optionProps}
          >
            {options.map((option) => (
              <StyledDropDownItem
                key={option}
                onClick={() => handleSelect(option)}
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
