import { ChangeEvent, HTMLAttributes } from 'react';

interface SearchProps extends HTMLAttributes<HTMLDivElement> {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  iconProps?: HTMLAttributes<HTMLSpanElement>;
}

export default SearchProps;
