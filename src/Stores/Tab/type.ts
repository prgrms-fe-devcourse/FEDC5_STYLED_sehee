interface IsTabType {
  tab: 'home' | 'add' | 'search' | 'alarm' | 'message' | 'account';
  prev: 'home' | 'message' | 'account';
  setTab: (
    newTab: 'home' | 'add' | 'search' | 'alarm' | 'message' | 'account',
  ) => void;
  setPrev: (currentTab: 'home' | 'message' | 'account') => void;
}

export default IsTabType;
