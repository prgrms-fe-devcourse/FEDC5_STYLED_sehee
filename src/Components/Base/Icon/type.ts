import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  isFill?: boolean;
}

export default IconProps;
