import styled from 'styled-components';
import { skeletonZoomIn, skeletonLoading } from '@/Styles/Animation';

const Base = styled.div`
  display: inline-block;
  border-radius: 1rem;
  background-image: linear-gradient(
    90deg,
    #dfe3e8 0px,
    #efefef 40px,
    #dfe3e8 80px
  );
  background-size: 200% 100%;
  background-position: 0 center;

  animation:
    ${skeletonZoomIn} 0.2s ease-out,
    ${skeletonLoading} 2s infinite linear;
`;

export const StyledBox = styled(Base)<{ $width: string; $height: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  flex-shrink: 1;
  flex-grow: 0;
`;

export const StyledCircle = styled(Base)<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  flex-shrink: 0;
  flex-grow: 0;
`;
