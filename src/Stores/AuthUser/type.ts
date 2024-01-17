import { UserType } from '@/Types/UserType';

export interface AuthUserType {
  user: Partial<UserType>;
  setAuthUser: (user: Partial<UserType>) => void;
}
