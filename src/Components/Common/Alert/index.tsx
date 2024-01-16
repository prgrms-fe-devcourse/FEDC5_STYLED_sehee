import Button from '@/Components/Base/Button';
import Modal from '../Modal';
import {
  StyledAlertWrapper,
  StyledButtonWrapper,
  StyledMessage,
} from './style';
import { AlertPropsType } from './type';

/**
 * @param message Alert에 띄우고 싶은 메시지를 입력하세요.
 * @param confirmContent confirm 버튼 내용을 커스텀 할 수 있습니다.
 * @param cancleContent cancle 버튼 내용을 커스텀 할 수 있습니다.
 * @param mode alert, confirm 2가지 모드를 제공합니다.
 */
const Alert = ({
  width = 25,
  height = 15,
  message,
  fontSize = 1,
  confirmContent = 'OK',
  cancleContent = 'CANCEL',
  mode = 'alert',
  onConfirm,
  onCancle,
  onChangeOpen,
}: AlertPropsType) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    if (onChangeOpen) {
      onChangeOpen(false);
    }
  };

  const handleCancle = () => {
    if (onCancle) {
      onCancle();
    }
    if (onChangeOpen) {
      onChangeOpen(false);
    }
  };

  return (
    <Modal
      width={width}
      height={height}
      onChangeOpen={onChangeOpen}
    >
      <StyledAlertWrapper>
        <StyledMessage $fontSize={fontSize}>{message}</StyledMessage>
        <StyledButtonWrapper>
          <Button
            height="30"
            onClick={handleConfirm}
          >
            {confirmContent}
          </Button>
          {mode === 'confirm' && (
            <Button
              height="30"
              onClick={handleCancle}
            >
              {cancleContent}
            </Button>
          )}
        </StyledButtonWrapper>
      </StyledAlertWrapper>
    </Modal>
  );
};

export default Alert;
