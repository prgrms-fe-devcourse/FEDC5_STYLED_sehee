import styled from 'styled-components';
import { ModalPropsType, ModalSizeType } from './type';

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const ModalContainer = styled.div<ModalSizeType>`
  background: white;
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  z-index: 10;
  overflow: hidden;
  border-radius: ${(props) => props.radius}px;
`;

const Modal = ({
  width = 80,
  height = 80,
  radius = 5,
  children,
}: ModalPropsType) => {
  return (
    <ModalWrapper>
      <ModalBackground />
      <ModalContainer
        width={width}
        height={height}
        radius={radius}
      >
        {children}
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
