import styled from 'styled-components';
import { MouseEvent, useRef } from 'react';
import {
  ModalPropsType,
  StyledModalContainerType,
  StyledModalWrapperType,
} from './type';

const StyledModalWrapper = styled.div<StyledModalWrapperType>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const StyledModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledModalContainer = styled.div<StyledModalContainerType>`
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

const Modal = ({
  children,
  width = 80,
  height = 80,
  borderRadius = 5,
  flexDirection = 'row',
  isOpen,
  onChangeOpen,
}: ModalPropsType) => {
  const modalBgRef = useRef(null);

  /**
   * 모달 바깥 배경을 클릭하면 currentTarget를 확인후
   * 외부 setIsOpen함수에 onChangeOpen 함수를 통해 false 전달하는 함수
   */
  const handleModalBgClick = (e: MouseEvent) => {
    if (e.currentTarget === modalBgRef.current) onChangeOpen(false);
  };

  return (
    <StyledModalWrapper $isOpen={isOpen}>
      <StyledModalBackground
        ref={modalBgRef}
        onClick={handleModalBgClick}
      />
      <StyledModalContainer
        width={width}
        height={height}
        $borderRadius={borderRadius}
        $flexDirection={flexDirection}
      >
        {children}
      </StyledModalContainer>
    </StyledModalWrapper>
  );
};

export default Modal;
