import { create } from 'zustand';
import { AuthUserType } from './type';
import { UserType } from '@/Types/UserType';

const useAuthUserStore = create<AuthUserType>((set) => ({
  user: {},
  setAuthUser: (user: Partial<UserType>) => set({ user }),
}));

export default useAuthUserStore;
