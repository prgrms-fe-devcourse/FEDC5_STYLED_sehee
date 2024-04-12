import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const useResize = (size?: number) => {
  const [isMobileSize, setIsMobileSize] = useState(
    window.innerWidth < (size || 768),
  );
  const { device } = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileSize(window.innerWidth < (size || 768));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [device, size]);

  return {
    isMobileSize,
    setIsMobileSize,
  };
};

export default useResize;
