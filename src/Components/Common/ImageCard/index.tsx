import Icon from '@/Components/Base/Icon';
import { Props } from './type';
import {
  StyledContainer,
  StyledHoverInfo,
  StyledHoverInfoText,
  StyledImg,
  StyledInfoContainer,
} from './style';

const ImageCard = ({
  src,
  alt = 'img',
  comment,
  heart,
  borderRadius = '2rem',
  width = '20rem',
  height = '20rem',
  fontSize = 1.8,
  onDetail,
  ...props
}: Props) => {
  return (
    <StyledContainer
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      onClick={onDetail}
      {...props}
    >
      <StyledImg
        src={src}
        alt={alt}
      />
      <StyledInfoContainer
        $borderRadius={borderRadius}
        className="imgInfo"
      >
        <StyledHoverInfo>
          <Icon
            name="favorite"
            style={{
              color: '#FFFFFF',
              fontSize: `${fontSize + 1}rem`,
            }}
          />
          <StyledHoverInfoText $fontSize={fontSize}>
            {heart}
          </StyledHoverInfoText>
        </StyledHoverInfo>
        <StyledHoverInfo>
          <Icon
            name="comment"
            style={{
              color: '#FFFFFF',
              fontSize: `${fontSize + 1}rem`,
            }}
          />
          <StyledHoverInfoText $fontSize={fontSize}>
            {comment}
          </StyledHoverInfoText>
        </StyledHoverInfo>
      </StyledInfoContainer>
    </StyledContainer>
  );
};

export default ImageCard;
