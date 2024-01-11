import { UserType } from '@/Types/UserType';

export interface Props {
  userList: UserType[];
  onlineUserList: UserType[];
  loadMoreUsers: () => void;
}
