import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';
import useTabStore from '@/Stores/Tab';
import PasswordForm from './PasswordForm';
import Alert from '@/Components/Common/Alert';

const PasswordModal = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(true);
  const navigate = useNavigate();
  const { prev, setTab } = useTabStore();
  const [alertMessage, setAlertMessage] = useState('');

  const handleCloseModal = (state: boolean) => {
    navigate(-1);
    setPasswordModalOpen(state);
    setTab(prev);
  };

  const onErrorCallback = useCallback((errorMessage: string) => {
    setAlertMessage(errorMessage);
  }, []);

  return isPasswordModalOpen ? (
    <>
      <Modal
        height={45}
        width={40}
        onChangeOpen={handleCloseModal}
      >
        <PasswordForm onErrorCallback={onErrorCallback} />
      </Modal>
      {alertMessage && (
        <Alert
          message={alertMessage}
          onChangeOpen={() => setAlertMessage('')}
        />
      )}
    </>
  ) : null;
};

export default PasswordModal;
