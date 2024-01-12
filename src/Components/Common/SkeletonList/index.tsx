/* eslint-disable react/no-array-index-key */
import { StyledSkeletonContainer, StyledSkeletonWrapper } from './style';
import { Props } from './type';

const SkeletonList = ({ children, length, liProps, ...props }: Props) => {
  return (
    <StyledSkeletonWrapper {...props}>
      {Array.from({ length }).map((_, index) => (
        <StyledSkeletonContainer
          key={index}
          {...liProps}
        >
          {children}
        </StyledSkeletonContainer>
      ))}
    </StyledSkeletonWrapper>
  );
};

export default SkeletonList;
