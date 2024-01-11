import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';

const AddChannelModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
    navigate('/');
  };

  return isOpen ? (
    <Modal onChangeOpen={handleCloseModal}>채널 추가 모달</Modal>
  ) : null;
};

export default AddChannelModal;
