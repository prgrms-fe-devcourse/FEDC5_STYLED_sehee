import { HTMLAttributes, FormHTMLAttributes } from 'react';

interface SearchProps extends FormHTMLAttributes<HTMLFormElement> {
  onChangehandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmithandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  iconProps?: HTMLAttributes<HTMLSpanElement>;
  inputProps?: HTMLAttributes<HTMLInputElement>;
}

export default SearchProps;
