import { HTMLAttributes, ButtonHTMLAttributes } from 'react';

export interface DropDownProps {
  options: string[];
  label?: string;
  labelTextColor?: string;
  labelTextSize?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
  textSize?: string;
  itemBackgroundColor?: string;
  itemTextColor?: string;
  itemTextSize?: string;
  onSelect?: (selected: string) => void;

  buttonProps?: HTMLAttributes<HTMLElement>;
  optionProps?: HTMLAttributes<HTMLElement>;
  itemProps?: HTMLAttributes<HTMLElement>;
}

export interface StyledDropDownButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $width: string;
  $height: string;
  $backgroundColor: string;
  $textColor: string;
}

export interface StyledDropDownItemProp {
  $itemBackgroundColor: string;
  $itemTextColor: string;
  $itemTextSize: string;
}
