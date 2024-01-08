import { HTMLAttributes } from 'react';

export interface ImageUploadProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  fontSize?: number;
}

export interface ImageFileType {
  file: File;
  imageUrl: string;
  type: string;
}
