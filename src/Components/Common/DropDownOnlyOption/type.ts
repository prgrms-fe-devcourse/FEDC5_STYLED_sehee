import { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export interface DropDownProps {
  children?: ReactNode;
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
  isShow?: boolean;
  initialValue?: string;
  onSelect?: (selected: string) => void;
  inset?: string;

  buttonProps?: HTMLAttributes<HTMLElement>;
  optionProps?: HTMLAttributes<HTMLElement>;
  itemProps?: HTMLAttributes<HTMLElement>;
  labelProps?: HTMLAttributes<HTMLElement>;
}

export interface StyledLabelProp extends HTMLAttributes<HTMLDivElement> {
  $labelTextColor: string;
  $labelTextSize: string;
  $backgroundColor: string;
}

export interface StyledDropDownButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $width: string;
  $height: string;
  $backgroundColor: string;
  $textColor: string;
  $textSize: string;
}

export interface StyledDropDownItemProp {
  $itemBackgroundColor: string;
  $itemTextColor: string;
  $itemTextSize: string;
  $width: string;
}
