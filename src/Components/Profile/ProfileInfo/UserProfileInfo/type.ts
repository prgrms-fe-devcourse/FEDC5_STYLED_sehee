import { FollowingType, UserType } from '@/Types/UserType';

export interface NameProps {
  name: string;
  user: UserType;
  isFollowing: null | FollowingType | undefined;
}
