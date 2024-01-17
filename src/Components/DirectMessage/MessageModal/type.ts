import { UserType } from '@/Types/UserType';

export interface MessageModalProps {
  setIsModalOpen: (state: boolean) => void;
  loginUser: Partial<UserType>;
  isMobileSize: boolean;
}
