import { MouseEvent, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'styled-components';
import { ModalPropsType } from './type';
import {
  StyledModalWrapper,
  StyledModalBackground,
  StyledModalContainer,
} from './style';

/**
 *
 * @param width 단위 % (optional)
 * @param height 단위 % (optional)
 * @param borderRadius 단위 rem (optional)
 * @param flexDirection 모달 내 요소 flex 정렬 기준 : row | column (optional)
 * @param onChangeOpen 외부에서 모달 open 핸들러 함수 (optional)
 * @returns
 */
const Modal = ({
  children,
  width = 80,
  height = 80,
  borderRadius = 0.5,
  flexDirection = 'row',
  onChangeOpen,
}: ModalPropsType) => {
  const modalBgRef = useRef(null);
  const theme = useTheme();

  /**
   * 모달 바깥 배경을 클릭하면 currentTarget를 확인후
   * 외부 setIsOpen함수에 onChangeOpen 함수를 통해 false 전달하는 함수
   */
  const handleModalClose = (e: MouseEvent) => {
    e.stopPropagation();
    if (e.currentTarget === modalBgRef.current && onChangeOpen)
      onChangeOpen(false);
  };

  return createPortal(
    <StyledModalWrapper>
      <StyledModalBackground
        ref={modalBgRef}
        onClick={handleModalClose}
      />
      <StyledModalContainer
        width={width}
        height={height}
        $borderRadius={borderRadius}
        $flexDirection={flexDirection}
        $backgroundColor={theme.colors.background}
        $color={theme.colors.text}
      >
        {children}
      </StyledModalContainer>
    </StyledModalWrapper>,
    document.body,
  );
};

export default Modal;
