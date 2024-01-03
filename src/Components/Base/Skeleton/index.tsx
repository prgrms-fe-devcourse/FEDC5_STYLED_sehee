import { StyledBox, StyledCircle } from './style';
import {
  SkeletonBoxProp,
  SkeletonCircleProp,
  SkeletonParagraphProp,
} from './type';

const Box = ({ width, height, ...props }: SkeletonBoxProp) => {
  return (
    <StyledBox
      $width={width || '100%'}
      $height={height || '100px'}
      {...props}
    />
  );
};

const Circle = ({ size, ...props }: SkeletonCircleProp) => {
  return (
    <StyledCircle
      $size={size || '100px'}
      {...props}
    />
  );
};

const Paragraph = ({ line = 3, ...props }: SkeletonParagraphProp) => {
  return (
    <div {...props}>
      {Array.from(Array(line), (_, index) => {
        return (
          <Box
            width="100%"
            height="16px"
            key={index}
          />
        );
      })}
    </div>
  );
};

const Skeleton = {
  Box,
  Circle,
  Paragraph,
};

export default Skeleton;
