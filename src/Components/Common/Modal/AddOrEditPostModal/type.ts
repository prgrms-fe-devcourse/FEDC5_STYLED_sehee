import { ImageFileType } from '../../ImageUpload/type';

export interface Props {
  onChangeOpen: (state: boolean) => void;
}

export interface PostFieldProps {
  title: string;
  category: string;
  image: ImageFileType | null;
}
