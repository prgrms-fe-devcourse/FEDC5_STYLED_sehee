/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { useMemo } from 'react';
import { Props } from './type';

const useDebouncedSearch = ({
  inputRef,
  follows = [],
  callback,
  setIsTyping,
  delay = 200,
}: Props) => {
  const debouncedSearch = useMemo(
    () =>
      debounce(() => {
        if (!inputRef || !inputRef.current) {
          return;
        }
        const query = inputRef.current.value.trim();
        callback(query, follows);

        setTimeout(() => {
          setIsTyping(false);
        }, 400);
      }, delay),
    [],
  );

  return debouncedSearch;
};

export default useDebouncedSearch;
