import styled from 'styled-components';
import { StyledBadgeProp } from './type';

const StyledBadge = styled.span<StyledBadgeProp>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.1rem 0.2rem;
  font-size: ${({ $textSize }) => $textSize};

  ${({ $position }) =>
    ({
      leftTop: 'top: 0px; left: 0px;',
      leftBottom: 'bottom: 0px; left: 0px;',
      rightTop: 'top: 0px; right: 0px;',
      rightBottom: 'bottom: 0px; right: 0px;',
    })[$position]};

  ${({ $shape, $size }) =>
    ({
      circle: `
        width: ${$size};
        height: ${$size};
        border-radius: 50%;`,
      ellipse: `
        width: calc(${$size} * 1.3)rem;;
        height: ${$size}rem;
        border-radius: 45%;`,
    })[$shape]}

  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $textColor }) => $textColor};
`;

export default StyledBadge;
