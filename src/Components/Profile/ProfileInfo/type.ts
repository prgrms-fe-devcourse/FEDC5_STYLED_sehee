import { FollowingType, UserType } from '@/Types/UserType';

export interface NameProps {
  name: string;
  id: string;
}

export interface Props {
  userData: UserType;
  userDataRefetch: () => void;
  isMyProfile: boolean;
  isFollowing: null | FollowingType | undefined;
  isLoading: boolean;
}
