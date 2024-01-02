import styled from 'styled-components';
import { StyledAvatarWrapperProp, StyledAvatarProp } from './type';

export const StyledAvatarWrapper = styled.div<StyledAvatarWrapperProp>`
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
      round: `20%`,
      square: '0px',
    })[$shape || 'square']};
`;

export const StyledAvatar = styled.img<StyledAvatarProp>`
  display: block;
  ${({ $size, $mode }) => `
    width: ${$size}px;
    height: ${$size}px;
    object-fit: ${$mode}
  `}
`;
