import { HTMLAttributes, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  block?: boolean;
  errorMessage?: string;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
}

export default Props;
