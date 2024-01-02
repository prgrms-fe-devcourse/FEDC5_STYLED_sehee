import { HTMLAttributes, ImgHTMLAttributes } from 'react';

export interface AvatarProp extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  size?: number;
  shape?: 'circle' | 'round' | 'square';
  mode?: 'cover' | 'contain' | 'fill';
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
}

export interface StyledAvatarWrapperProp
  extends HTMLAttributes<HTMLDivElement> {
  $shape: string;
}

export interface StyledAvatarProp extends ImgHTMLAttributes<HTMLImageElement> {
  $size: number;
  $mode: string;
}
