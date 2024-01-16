import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ChannelState } from './type';
import { SESSION_STORAGE } from '@/Constants/storage';

const useChannelStore = create(
  persist<ChannelState>(
    (set) => ({
      currentChannelId: '',
      setCurrentChannelId: (newChannelId: string) =>
        set({ currentChannelId: newChannelId }),
    }),
    {
      name: SESSION_STORAGE.CURRENT_CHANNEL_ID,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useChannelStore;
