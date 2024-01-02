import { ForwardedRef, forwardRef } from 'react';
import { AvatarProp } from './type';
import { StyledAvatarWrapper, StyledAvatar } from './style';

const Avatar = forwardRef(
  (
    {
      children,
      src,
      alt,
      size = 20,
      shape = 'circle',
      mode = 'cover',
      wrapperProps,
      ...props
    }: AvatarProp,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <StyledAvatarWrapper
        $shape={shape}
        ref={ref}
        {...wrapperProps}
      >
        <StyledAvatar
          src={src || `https://via.placeholder.com/${size}.jpg`}
          alt={alt}
          $size={size}
          $mode={mode}
          {...props}
        />
        {children}
      </StyledAvatarWrapper>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
