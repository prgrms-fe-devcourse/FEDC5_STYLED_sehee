import { HTMLAttributes } from 'react';

export interface ModalPropsType extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  borderRadius?: number;
  flexDirection?: 'row' | 'column';
  onChangeOpen?: (openState: boolean) => void;
}

export interface StyledModalContainerType
  extends HTMLAttributes<HTMLDivElement> {
  width: number;
  height: number;
  $borderRadius: number;
  $flexDirection: 'row' | 'column';
}
