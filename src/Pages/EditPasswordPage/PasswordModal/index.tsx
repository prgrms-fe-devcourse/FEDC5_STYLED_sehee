import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';
import useTabStore from '@/Stores/Tab';
import PasswordForm from '../../../Components/EditPassword/PasswordForm';
import Alert from '@/Components/Common/Alert';
import { StyledPasswordContainer } from '../../../Components/EditPassword/PasswordForm/style';
import useResize from '@/Hooks/useResize';

const PasswordModal = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(true);
  const navigate = useNavigate();
  const { prev, setTab } = useTabStore();
  const [isSuccess, setIsSuccess] = useState(false);
  const { isMobileSize } = useResize();

  const handleCloseModal = (state: boolean) => {
    navigate(-1);
    setPasswordModalOpen(state);
    setTab(prev);
  };

  const onSuccessCallback = useCallback((success: boolean) => {
    setIsSuccess(success);
  }, []);

  return isPasswordModalOpen ? (
    <>
      <Modal
        height={45}
        width={isMobileSize ? 70 : 38}
        onChangeOpen={handleCloseModal}
      >
        <StyledPasswordContainer>
          <PasswordForm onSuccessCallback={onSuccessCallback} />
        </StyledPasswordContainer>
      </Modal>
      {isSuccess && (
        <Alert
          message="비밀번호 변경에 성공했습니다"
          onChangeOpen={() => {
            setIsSuccess(false);
            handleCloseModal(false);
          }}
        />
      )}
    </>
  ) : null;
};

export default PasswordModal;
