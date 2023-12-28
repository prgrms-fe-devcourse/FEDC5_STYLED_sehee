import { ReactNode } from 'react';

export interface ModalPropsType extends ModalStyleType {
  children: ReactNode;
}

export interface ModalStyleType {
  width?: number;
  height?: number;
  radius?: number;
  direction?: 'row' | 'column';
}
