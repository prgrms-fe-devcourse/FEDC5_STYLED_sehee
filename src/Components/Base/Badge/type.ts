import { HTMLAttributes } from 'react';

export interface BadgeProp extends HTMLAttributes<HTMLSpanElement> {
  size?: string;
  position: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  backgroundColor?: string;
  textColor?: string;
  textSize?: string;
}

export interface StyledBadgeProp extends HTMLAttributes<HTMLSpanElement> {
  $size: string;
  $position: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  $backgroundColor: string;
  $textColor: string;
  $textSize: string;
  $shape: string;
}
