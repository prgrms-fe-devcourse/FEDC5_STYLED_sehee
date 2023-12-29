import { MouseEvent, useRef } from 'react';
import { ModalPropsType } from './type';
import {
  StyledModalWrapper,
  StyledModalBackground,
  StyledModalContainer,
} from './style';

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
  const handleModalClose = (e: MouseEvent) => {
    if (e.currentTarget === modalBgRef.current) onChangeOpen(false);
  };

  return (
    <StyledModalWrapper $isOpen={isOpen}>
      <StyledModalBackground
        ref={modalBgRef}
        onClick={handleModalClose}
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
