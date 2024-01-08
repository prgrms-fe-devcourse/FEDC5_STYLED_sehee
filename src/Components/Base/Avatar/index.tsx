import { ForwardedRef, forwardRef } from 'react';
import { AvatarProp } from './type';
import { StyledImage, StyledAvatar, StyledWrapper } from './style';

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
      containerProps,
      ...props
    }: AvatarProp,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <StyledWrapper
        $size={size}
        ref={ref}
        {...wrapperProps}
      >
        <StyledAvatar
          $shape={shape}
          {...containerProps}
        >
          <StyledImage
            src={src || `https://via.placeholder.com/${size}.jpg`}
            alt={alt}
            $size={size}
            $mode={mode}
            {...props}
          />
        </StyledAvatar>
        {children}
      </StyledWrapper>
    );
  },
);

Avatar.displayName = 'Avatar';

export default Avatar;
