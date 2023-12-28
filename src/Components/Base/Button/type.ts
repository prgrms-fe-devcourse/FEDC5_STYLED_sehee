import { ButtonHTMLAttributes } from 'react';

export interface ButtonProp extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'default' | 'black' | 'gray' | 'white' | 'blue' | 'purple';
  width: number;
  height: number;
  borderRound: 'none' | 'sm' | 'md' | 'lg';
  isToggle?: boolean;
  onClick?: () => void;
  onActiveChange?: (state: boolean) => void;
}
