import { ButtonHTMLAttributes } from 'react';

export interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor?: 'default' | string;
  textColor?: 'default' | string;
  textSize?: 'default' | string;
  width?: 'default' | string;
  height?: 'default' | string;
  borderRadius?: 'default' | string;
  isToggleButton?: 'default' | boolean;

  // TODO: isToggleButton=true일 때 active 잘 넘어오는지 체크
  onClick?: (active?: boolean) => void;
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
