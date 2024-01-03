/**
 * 객체 형태로 관리되는 Skeleton 컴포넌트입니다. 사용 시 <Skeleton.Box/>의 형태로 선언해주세요.
 * @param size, width, height: 모양마다 전달되는 프롭의 형태가 조금씩 다르며, 모두 px / rem 등의 단위를 포함한 String 형태로 전달해주어야 합니다.
 */

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
      $height={height || '10rem'}
      {...props}
    />
  );
};

const Circle = ({ size, ...props }: SkeletonCircleProp) => {
  return (
    <StyledCircle
      $size={size || '10rem'}
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
            height="1.6rem"
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
