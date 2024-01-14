import { UserType } from '@/Types/UserType';

export interface FollowModalProps {
  userData: UserType;
  mode: 'follower' | 'following';
  loginUser: Partial<UserType>;
  loginUserRefetch: () => void;
  onChangeOpen: (state: boolean) => void;
}
