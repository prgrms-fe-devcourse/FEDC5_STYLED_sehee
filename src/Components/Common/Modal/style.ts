import styled from 'styled-components';
import { StyledModalContainerType } from './type';

export const StyledModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const StyledModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const StyledModalContainer = styled.div<StyledModalContainerType>`
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  display: flex;
  z-index: 10;
  background: white;
  overflow: hidden;
  border-radius: ${(props) => props.$borderRadius}px;
  ${(props) =>
    props.$flexDirection !== 'row'
      ? 'flex-direction: column; align-items: center;'
      : undefined}
`;
