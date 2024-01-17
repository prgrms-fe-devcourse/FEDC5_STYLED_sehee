/* eslint-disable react-hooks/exhaustive-deps */
import { debounce } from 'lodash';
import { Props } from './type';

const useDebouncedSearch = ({
  inputRef,
  follows = [],
  callback,
  delay = 200,
}: Props) => {
  const debouncedSearch = debounce(() => {
    if (!inputRef || !inputRef.current) {
      return;
    }
    const query = inputRef.current.value.trim();
    callback(query, follows);
  }, delay);
  return debouncedSearch;
};

export default useDebouncedSearch;
