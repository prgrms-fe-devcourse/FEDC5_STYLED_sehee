import styled from 'styled-components';
import { StyledModalContainerType } from './type';

export const StyledModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  overflow: hidden;
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
  background: ${(props) => props.$backgroundColor};
  border: 1px solid ${({ theme }) => theme.colors.modalBorder};
  color: ${(props) => props.$color};
  overflow: hidden;
  border-radius: ${(props) => props.$borderRadius}rem;
  ${(props) =>
    props.$flexDirection !== 'row'
      ? 'flex-direction: column; align-items: center;'
      : undefined}
`;
