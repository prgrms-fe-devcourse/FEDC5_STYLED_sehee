import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
}

export default IconProps;
