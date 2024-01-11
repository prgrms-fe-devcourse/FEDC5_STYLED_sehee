import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  isFill?: boolean;
  className?: string;
}

export default IconProps;
