import { UserType } from '@/Types/UserType';

export interface FollowModalProps {
  //   follows: UserType[];
  //   setFollows: (state: UserType[]) => void;
  userData: UserType;
  mode: 'follower' | 'following';
  loginUser: Partial<UserType>;
  onChangeOpen: (state: boolean) => void;
}
