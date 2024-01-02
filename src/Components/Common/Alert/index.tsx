import styled from 'styled-components';
import { HTMLAttributes } from 'react';
import Button from '@/Components/Base/Button';
import Modal from '../Modal';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
`;

const StyledButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export interface AlertPropsType extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  message: string;
  mode: 'alert' | 'confirm';
  onChangeOpen: (openState: boolean) => void;
}

const Alert = ({
  width = 20,
  height = 15,
  onChangeOpen,
  message,
  mode = 'alert',
}: AlertPropsType) => {
  return (
    <Modal
      width={width}
      height={height}
      onChangeOpen={onChangeOpen}
    >
      <StyledWrapper>
        <div>{message}</div>
        <StyledButtonWrapper>
          <Button height="30">OK</Button>
          {mode === 'confirm' && <Button height="30">CANCEL</Button>}
        </StyledButtonWrapper>
      </StyledWrapper>
    </Modal>
  );
};

export default Alert;
