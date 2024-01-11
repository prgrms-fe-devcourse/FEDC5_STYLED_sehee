import { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLUListElement> {
  length: number;
  liProps?: HTMLAttributes<HTMLLIElement>;
}
