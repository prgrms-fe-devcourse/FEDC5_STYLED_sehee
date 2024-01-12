import { HTMLAttributes } from 'react';

export interface ImageUploadProps extends HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
  fontSize?: number;
  onUpload?: (imageFile: ImageFileType | string | null) => void;
  initialValue?: string;
}

export interface ImageFileType {
  file: File;
  imageUrl: string;
  type: string;
}
