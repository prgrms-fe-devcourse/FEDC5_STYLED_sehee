import { ForwardedRef, forwardRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { AvatarProp } from './type';
import { StyledImage, StyledAvatar, StyledWrapper } from './style';
import DEFAULT_USER_IMAGE_SRC from '@/Constants/defaultUserImage';

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
    const [loadedSrc, setLoadedSrc] = useState('');
    const { ref: inViewRef, inView } = useInView({
      triggerOnce: true,
      rootMargin: '50px 0px',
    });

    useEffect(() => {
      if (inView) {
        setLoadedSrc(src || DEFAULT_USER_IMAGE_SRC);
      }
    }, [inView]);

    return (
      <StyledWrapper
        $size={size}
        ref={ref}
        {...wrapperProps}
      >
        <StyledAvatar
          $shape={shape}
          {...containerProps}
          ref={inViewRef}
        >
          <StyledImage
            src={loadedSrc}
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
