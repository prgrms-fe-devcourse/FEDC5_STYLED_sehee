import { HTMLAttributes, ImgHTMLAttributes } from 'react';

export interface AvatarProp extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: number;
  shape?: 'circle' | 'round' | 'square';
  mode?: 'cover' | 'contain' | 'fill';
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  containerProps?: HTMLAttributes<HTMLDivElement>;
}

export interface StyledWrapperProp extends HTMLAttributes<HTMLDivElement> {
  $size: number;
}

export interface StyledAvatarProp extends HTMLAttributes<HTMLDivElement> {
  $shape: string;
}

export interface StyledImageProp extends ImgHTMLAttributes<HTMLImageElement> {
  $size: number;
  $mode: string;
}
