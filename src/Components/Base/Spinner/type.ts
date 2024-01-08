import { HTMLAttributes } from 'react';

export interface SpinnerProp {
  size?: number;
  color?: string;
  display?: string;
  isFixedCenter?: boolean;
  isBackground?: boolean;
  backgroundProps?: HTMLAttributes<HTMLElement>;
}

export interface StyledBackgroundProp extends HTMLAttributes<HTMLDivElement> {
  $isBackground: boolean;
}

export interface StyledSpinnerProp extends HTMLAttributes<HTMLDivElement> {
  $size: number;
  $color: string;
  $display: string;
  $isFixedCenter: boolean;
}
