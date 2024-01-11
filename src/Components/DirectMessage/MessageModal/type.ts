import { UserType } from '@/Types/UserType';

export interface MessageModalProps {
  onChangeOpen: (state: boolean) => void;
  setReceiver: (state: UserType) => void;
  setIsModalOpen: (state: boolean) => void;
  loginUser: Partial<UserType>;
  isMobileSize?: boolean;
}
