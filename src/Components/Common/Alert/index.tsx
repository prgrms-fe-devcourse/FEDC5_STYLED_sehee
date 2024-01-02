import Button from '@/Components/Base/Button';
import Modal from '../Modal';
import { StyledAlertWrapper, StyledButtonWrapper } from './style';
import { AlertPropsType } from './type';

/**
 * @param message Alert에 띄우고 싶은 메시지를 입력하세요.
 * @param confirmContent confirm 버튼 내용을 커스텀 할 수 있습니다.
 * @param cancleContent cancle 버튼 내용을 커스텀 할 수 있습니다.
 * @param mode alert, confirm 2가지 모드를 제공합니다.
 */
const Alert = ({
  width = 20,
  height = 15,
  message,
  confirmContent = 'OK',
  cancleContent = 'CANCEL',
  mode = 'alert',
  onChangeOpen,
  onConfirm,
  onCancle,
}: AlertPropsType) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onChangeOpen(false);
  };

  const handleCancle = () => {
    if (onCancle) {
      onCancle();
    }
    onChangeOpen(false);
  };

  return (
    <Modal
      width={width}
      height={height}
      onChangeOpen={onChangeOpen}
    >
      <StyledAlertWrapper>
        <div>{message}</div>
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
