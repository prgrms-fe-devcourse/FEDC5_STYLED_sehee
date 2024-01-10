import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';

const SearchModal = () => {
  const [isSearchModalOpen, setSearchModalOpen] = useState(true);
  const navigate = useNavigate();

  const handleCloseModal = (state: boolean) => {
    navigate(-1);
    setSearchModalOpen(state);
  };

  return isSearchModalOpen ? (
    <Modal
      height={20}
      onChangeOpen={handleCloseModal}
    >
      <h1>search</h1>
    </Modal>
  ) : null;
};

export default SearchModal;
