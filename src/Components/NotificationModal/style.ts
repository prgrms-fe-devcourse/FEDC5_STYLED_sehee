import styled from 'styled-components';
import { slideIn, slideOut } from '@/Styles/Animation';

const StyledWrapper = styled.article<{ $isMounted: boolean }>`
  width: 45rem;
  height: calc(80vh - 9.4rem);
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.size.small};
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 5rem;
  top: 9.5rem;
  animation: ${({ $isMounted }) => (!$isMounted ? slideIn : slideOut)} 0.8s
    ease-in-out;

  @media ${({ theme }) => theme.device.laptop} {
    width: 100%;
    height: 100vh;
    right: 0;
    border: none;
    border-radius: 0;
  }
`;

export default StyledWrapper;
