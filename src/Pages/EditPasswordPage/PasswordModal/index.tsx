import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';

const PasswordModal = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleCloseModal = (state: boolean) => {
    navigate(-1);
    setPasswordModalOpen(state);
  };

  return isPasswordModalOpen ? (
    <Modal
      height={20}
      onChangeOpen={handleCloseModal}
    >
      <h1>Password</h1>
    </Modal>
  ) : null;
};

export default PasswordModal;
