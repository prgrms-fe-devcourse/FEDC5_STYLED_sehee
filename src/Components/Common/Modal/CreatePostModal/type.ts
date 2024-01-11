import { PostType } from '@/Types/PostType';

export interface Props {
  post?: PostType;
  onChangeOpen?: (state: boolean) => void;
}
