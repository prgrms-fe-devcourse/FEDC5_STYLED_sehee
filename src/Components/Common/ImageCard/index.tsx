import Icon from '@/Components/Base/Icon';
import { Props } from './type';
import { StyledHover, StyledP } from './style';

const ImageCard = ({
  src,
  alt,
  comment,
  heart,
  width = '20rem',
  ...props
}: Props) => {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: '2rem',
        backgroundColor: '#fffddd',
        width,
        height: width,
        margin: '1rem',
        boxShadow: '0 0.1rem 0.1rem gray',
        cursor: 'pointer',
        display: 'inline-block',
      }}
    >
      <StyledP
        className="p-hover"
        style={{ opacity: '0' }}
      >
        <Icon name="favorite" /> {heart}
        <Icon name="comment" /> {comment}
      </StyledP>
      <img
        src={src}
        alt={alt}
        style={{ padding: '1rem' }}
        {...props}
      />
    </div>
  );
};

export default ImageCard;
