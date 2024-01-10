import { UserType } from '@/Types/UserType';

export interface Props {
  isLoading: boolean;
  isEnd: boolean;
  userList: UserType[];
  onlineUserList: UserType[];
  loadMoreUsers: () => void;
}
