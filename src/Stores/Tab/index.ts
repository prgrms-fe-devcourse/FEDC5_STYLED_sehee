import { create } from 'zustand';
import IsTabType from './type';

const initialTab = sessionStorage.getItem('tab') as
  | 'home'
  | 'add'
  | 'search'
  | 'alarm'
  | 'message'
  | 'account'
  | null;
const initialPrev = sessionStorage.getItem('prev') as
  | 'home'
  | 'message'
  | 'account'
  | null;

const useTabStore = create<IsTabType>((set) => ({
  tab: initialTab || 'home',
  prev: initialPrev || 'home',
  setTab: (newTab) => set({ tab: newTab }),
  setPrev: (currentTab) => set({ prev: currentTab }),
}));

export default useTabStore;
