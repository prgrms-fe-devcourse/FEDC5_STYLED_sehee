import { useState } from 'react';
import Icon from '@/Components/Base/Icon';
import Wrapper from './style';
import { Props } from './type';
import { useDarkModeStore } from '@/Stores';

const DarkMode = ({ ...props }: Props) => {
  const { isDarkMode, toggleDarkMode } = useDarkModeStore();
  const [animateKey, setAnimateKey] = useState(0);

  const handleClick = () => {
    toggleDarkMode();
    setAnimateKey((prevKey) => prevKey + 1);
  };

  return (
    <Wrapper
      {...props}
      key={animateKey}
      $isAnimation={animateKey}
      $isDarkMode={isDarkMode}
      onClick={handleClick}
    >
      <Icon
        name={!isDarkMode ? 'dark_mode' : 'light_mode'}
        style={{ color: 'inherit' }}
      />
    </Wrapper>
  );
};

export default DarkMode;
