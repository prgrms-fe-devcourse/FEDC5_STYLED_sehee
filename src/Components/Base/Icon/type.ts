import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: string;
  className?: string;
  ref?: React.RefObject<HTMLSpanElement>;
}

export default IconProps;
