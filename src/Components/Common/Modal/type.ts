import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

export interface ModalPropsType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  height?: number;
  borderRadius?: number;
  flexDirection?: 'row' | 'column';
  isOpen: boolean;
  onChangeOpen: (openState: boolean) => void;
}

export interface StyledModalWrapperType extends HTMLAttributes<HTMLDivElement> {
  $isOpen: boolean;
}
export interface StyledModalContainerType
  extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  $borderRadius: number;
  $flexDirection: 'row' | 'column';
}
