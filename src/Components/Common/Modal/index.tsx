import { ReactNode } from 'react';
import styled from 'styled-components';

interface ModalPropsType {
  children: ReactNode;
}

const ModalWrapper = styled.div``;

const ModalBackground = styled.div``;

const Modal = ({ children }: ModalPropsType) => {
  return (
    <ModalWrapper>
      Modalwrapper
      <ModalBackground />
      {children}
    </ModalWrapper>
  );
};

export default Modal;
