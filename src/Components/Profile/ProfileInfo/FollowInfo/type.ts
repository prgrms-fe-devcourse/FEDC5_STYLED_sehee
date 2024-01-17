import { UserType } from '@/Types/UserType';

export interface Props {
  userData: UserType;
  userDataRefetch: () => void;
}
