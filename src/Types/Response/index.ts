import { UserType } from '../UserType';

export interface UserResponse {
  user: UserType;
  token: string;
}
