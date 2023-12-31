import styled from 'styled-components';
import { StyledAvatarProp, StyledImageProp } from './type';

export const StyledAvatar = styled.div<StyledAvatarProp>`
  position: relative;
  display: inline-block;
  overflow: hidden;

  border: 1px solid
    ${({ theme }) => `
      ${theme.colors.border}
    `};
  border-radius: ${({ $shape }) =>
    ({
      circle: '50%',
      round: '4px',
      square: '0px',
    })[$shape || 'square']};
`;

export const StyledImage = styled.img<StyledImageProp>`
  display: block;
  ${({ $size, $mode }) => `
    width: ${$size}px;
    height: ${$size}px;
    object-fit: ${$mode}
  `}
`;
