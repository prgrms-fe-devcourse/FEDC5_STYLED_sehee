import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '@/Components/Common/Modal/CreatePostModal';
import useTabStore from '@/Stores/Tab';

const AddPostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { prev, setTab } = useTabStore();

  const naviagte = useNavigate();
  const handleCloseModal = (state: boolean) => {
    naviagte(-1);
    setIsModalOpen(state);
    setTab(prev);
  };

  return isModalOpen ? (
    <CreatePostModal onChangeOpen={handleCloseModal} />
  ) : null;
};

export default AddPostPage;
