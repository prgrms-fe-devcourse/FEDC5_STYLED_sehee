import { create } from 'zustand';
import IsTabType from './type';

const useTabStore = create<IsTabType>((set) => ({
  currentTab: 'home',
  prevTab: '',
  setCurrentTab: (text: string) => set({ currentTab: text }),
  setPrevTab: () => set((state) => ({ prevTab: state.currentTab })),
}));

export default useTabStore;
