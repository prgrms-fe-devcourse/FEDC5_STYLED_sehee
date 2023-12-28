import styled from 'styled-components';
import { ModalPropsType, ModalStyleType } from './type';

const StyledModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const StyledModalContainer = styled.div<ModalStyleType>`
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  display: flex;
  z-index: 10;
  background: white;
  overflow: hidden;
  border-radius: ${(props) => props.radius}px;
  ${(props) =>
    props.direction !== 'row'
      ? 'flex-direction: column; align-items: center;'
      : undefined}
`;

const Modal = ({
  width = 80,
  height = 80,
  radius = 5,
  direction = 'row',
  children,
}: ModalPropsType) => {
  return (
    <StyledModalWrapper>
      <StyledModalBackground />
      <StyledModalContainer
        width={width}
        height={height}
        radius={radius}
        direction={direction}
      >
        {children}
      </StyledModalContainer>
    </StyledModalWrapper>
  );
};

export default Modal;
