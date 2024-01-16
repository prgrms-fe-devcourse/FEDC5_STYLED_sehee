import { UserType } from '@/Types/UserType';

export interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  follows?: UserType[];
  callback: (query: string, follows: UserType[]) => void;
  delay?: number;
}
