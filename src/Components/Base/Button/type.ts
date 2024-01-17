import { ButtonHTMLAttributes } from 'react';

export interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: string;
  textColor?: string;
  textSize?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
  isActive?: boolean;
  isHoverBold?: boolean;
  isBold?: boolean;
}

export interface StyledButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $backgroundColor: string;
  $textColor: string;
  $textSize: string;
  $width: string;
  $height: string;
  $borderRadius: string;
  $hoverBackgroundColor: string;
  $hoverTextColor: string;
  $isActive?: boolean;
  $isHoverBold: boolean;
  $isBold: boolean;
}
