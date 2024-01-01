import { HTMLAttributes } from 'react';

interface SearchProps extends HTMLAttributes<HTMLInputElement> {
  onChangehandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmithandler: (e: React.FormEvent<HTMLFormElement>) => void;
  iconProps?: HTMLAttributes<HTMLSpanElement>;
}

export default SearchProps;
