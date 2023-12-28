import { ReactNode } from 'react';

export interface ModalPropsType extends ModalSizeType {
  children: ReactNode;
}

export interface ModalSizeType {
  width?: number;
  height?: number;
  radius?: number;
}
