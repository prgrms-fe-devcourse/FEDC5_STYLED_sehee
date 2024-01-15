import { UserType } from '@/Types/UserType';

export interface NameProps {
  name: string;
}

export interface Props {
  userData: UserType;
  userDataRefetch: () => void;
  isMyProfile: boolean;
}
