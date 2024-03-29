import { create } from 'zustand';
import { MessageReceiverType } from './type';
import { UserType } from '@/Types/UserType';

const useMessageReceiver = create<MessageReceiverType>((set) => ({
  receiver: null,
  setReceiver: (receiver: UserType | null) => set({ receiver }),
  isClickedUserCard: false,
  setIsClickedUserCard: (state: boolean) => set({ isClickedUserCard: state }),
}));

export default useMessageReceiver;
