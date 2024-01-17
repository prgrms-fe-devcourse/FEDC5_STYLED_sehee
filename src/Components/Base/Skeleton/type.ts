import { HTMLAttributes } from 'react';

export interface SkeletonBoxProp {
  width?: string;
  height?: string;
}

export interface SkeletonCircleProp {
  size?: string;
}

export interface SkeletonParagraphProp extends HTMLAttributes<HTMLDivElement> {
  line?: number;
  width?: string;
  height?: string;
}
