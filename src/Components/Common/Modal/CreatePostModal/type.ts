import { PostType } from '@/Types/PostType';
import { ImageFileType } from '../../ImageUpload/type';

export interface Props {
  post?: PostType;
  onChangeOpen: (state: boolean) => void;
}

export interface PostFieldProps {
  title: string;
  category: string;
  image: ImageFileType | null;
}
