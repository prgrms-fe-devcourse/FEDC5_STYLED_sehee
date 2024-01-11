import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/Components/Common/Modal';
import useTabStore from '@/Stores/Tab';

const PostModal = () => {
  const [isPostModalOpen, setPostModalOpen] = useState(true);
  const navigate = useNavigate();
  const { prev, setTab } = useTabStore();

  const handleCloseModal = (state: boolean) => {
    navigate(-1);
    setPostModalOpen(state);
    setTab(prev);
  };

  return isPostModalOpen ? (
    <Modal
      height={20}
      onChangeOpen={handleCloseModal}
    >
      <h1>Post</h1>
    </Modal>
  ) : null;
};

export default PostModal;
