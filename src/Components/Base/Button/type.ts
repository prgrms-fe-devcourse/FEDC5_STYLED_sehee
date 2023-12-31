import { ButtonHTMLAttributes } from 'react';

export interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: 'default' | string;
  textColor?: 'default' | string;
  textSize?: 'default' | string;
  width?: 'default' | string;
  height?: 'default' | string;
  borderRadius?: 'default' | string;
  isToggleButton?: 'default' | boolean;

  onClickButton?: (active?: boolean) => void;
  style?: React.CSSProperties;
}

export interface StyledButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $backgroundColor: string;
  $textColor: string;
  $textSize: string;
  $width: string;
  $height: string;
  $borderRadius: string;
  $isActive: boolean;
}
