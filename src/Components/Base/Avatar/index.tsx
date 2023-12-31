import { AvatarProp } from './type';
import { StyledAvatar, StyledImage } from './style';

const Avatar = ({
  src = 'default',
  alt,
  size = 20,
  shape = 'circle',
  mode = 'cover',
  style,
}: AvatarProp) => {
  return (
    <StyledAvatar $shape={shape}>
      <StyledImage
        src={
          src === 'default' ? `https://via.placeholder.com/${size}.jpg` : src
        }
        alt={alt}
        $size={size}
        $mode={mode}
        style={{ ...style }}
      />
    </StyledAvatar>
  );
};

export default Avatar;
