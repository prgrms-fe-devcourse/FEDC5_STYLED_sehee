interface IsTabType {
  currentTab: string;
  prevTab: string;
  setCurrentTab: (text: string) => void;
  setPrevTab: () => void;
}

export default IsTabType;
