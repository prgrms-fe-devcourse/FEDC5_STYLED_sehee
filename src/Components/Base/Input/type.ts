import { HTMLAttributes, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  initialFocus?: boolean;
  invalid?: boolean;
  block?: boolean;
  errorMessage?: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
}
export default Props;
