import { ReactNode } from 'react';

export interface ModalPropsType {
  children: ReactNode;
  width?: number;
  height?: number;
  borderRadius?: number;
  flexDirection?: 'row' | 'column';
  isOpen: boolean;
  onChangeOpen: (openState: boolean) => void;
}

export interface StyledModalWrapperType {
  $isOpen: boolean;
}
export interface StyledModalContainerType {
  width: number;
  height: number;
  $borderRadius: number;
  $flexDirection: 'row' | 'column';
}
