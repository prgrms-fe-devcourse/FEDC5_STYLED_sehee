import { UserType } from '@/Types/UserType';

export interface Props {
  author: UserType;
  src: string | undefined;
  text: string;
  date: string;
  type: string;
  typeId: string;
  isSeen: boolean;
  onClose: () => void;
}
