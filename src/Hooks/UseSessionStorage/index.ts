import { useState } from 'react';

const useSessionStorage = <T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedvalue, setStoredValue] = useState<T>(() => {
    try {
      const item = sessionStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedvalue, setValue];
};

export default useSessionStorage;
