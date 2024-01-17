import { HTMLAttributes, ReactNode } from 'react';

export interface AlertPropsType extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  message: string | ReactNode;
  fontSize?: number;
  confirmContent?: string;
  cancleContent?: string;
  mode?: 'alert' | 'confirm';
  onChangeOpen?: (openState: boolean) => void;
  onConfirm?: () => void;
  onCancle?: () => void;
}
