import { HTMLAttributes, ImgHTMLAttributes } from 'react';

export interface AvatarProp extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: number;
  shape?: 'circle' | 'round' | 'square';
  mode?: 'cover' | 'contain' | 'fill';
  style?: React.CSSProperties;
}

export interface StyledAvatarProp extends HTMLAttributes<HTMLDivElement> {
  $shape: string;
}

export interface StyledImageProp extends ImgHTMLAttributes<HTMLImageElement> {
  $size: number;
  $mode: string;
}
