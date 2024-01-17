import { HTMLAttributes, FormHTMLAttributes } from 'react';
import Props from '@/Components/Base/Input/type';

interface SearchProps extends FormHTMLAttributes<HTMLFormElement> {
  onChangehandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmithandler?: (e: React.FormEvent<HTMLFormElement>) => void;
  iconProps?: HTMLAttributes<HTMLSpanElement>;
  inputProps?: Props;
}

export default SearchProps;
