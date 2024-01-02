import { HTMLAttributes } from 'react';

export interface AlertPropsType extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  message: string;
  confirmContent?: string;
  cancleContent?: string;
  mode?: 'alert' | 'confirm';
  onChangeOpen: (openState: boolean) => void;
  onConfirm?: () => void;
  onCancle?: () => void;
}
