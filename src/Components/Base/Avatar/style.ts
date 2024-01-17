import styled from 'styled-components';
import { StyledWrapperProp, StyledImageProp, StyledAvatarProp } from './type';

export const StyledWrapper = styled.div<StyledWrapperProp>`
  position: relative;
  ${({ $size }) => `
    width: ${$size}px;
    height: ${$size}px;
  `}
`;

export const StyledAvatar = styled.div<StyledAvatarProp>`
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 100%;

  box-sizing: border-box;
  border: 1px solid
    ${({ theme }) => `
      ${theme.colors.border}
    `};
  border-radius: ${({ $shape }) =>
    ({
      circle: '50%',
      round: `20%`,
      square: '0px',
    })[$shape || 'square']};
`;

export const StyledImage = styled.img<StyledImageProp>`
  display: block;
  ${({ $mode }) => `object-fit: ${$mode}`};
  width: 100%;
  height: 100%;
`;
