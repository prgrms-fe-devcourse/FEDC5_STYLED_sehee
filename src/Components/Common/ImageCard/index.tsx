import { useTheme } from 'styled-components';
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
  size = '20rem',
  fontSize = '1.5rem',
  onDetail,
  ...props
}: Props) => {
  const { colors } = useTheme();
  return (
    <StyledContainer
      $size={size}
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
            style={{ color: colors.buttonText, fontSize }}
          />
          <StyledHoverInfoText $fontSize={fontSize}>
            {heart}
          </StyledHoverInfoText>
        </StyledHoverInfo>
        <StyledHoverInfo>
          <Icon
            name="comment"
            style={{ color: colors.buttonText, fontSize }}
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
