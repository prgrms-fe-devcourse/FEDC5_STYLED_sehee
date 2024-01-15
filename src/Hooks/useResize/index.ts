import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const useResize = () => {
  const [isMobileSize, setIsMobileSize] = useState(false);
  const { device } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [device]);

  return {
    isMobileSize,
    setIsMobileSize,
  };
};

export default useResize;
