import styled from 'styled-components';
import { float } from '@/Styles/Animation';

const StyledLogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: ${float} 2.5s ease-in-out infinite;

  user-select: none;
`;

export default StyledLogoImage;
