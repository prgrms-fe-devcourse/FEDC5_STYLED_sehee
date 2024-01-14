import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddOrEditPostModal from '@/Components/Common/Modal/AddOrEditPostModal';
import useTabStore from '@/Stores/Tab';

const AddOrEditPostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { prev, setTab } = useTabStore();

  const naviagte = useNavigate();
  const handleCloseModal = (state: boolean) => {
    naviagte(-1);
    setIsModalOpen(state);
    setTab(prev);
  };

  return isModalOpen ? (
    <AddOrEditPostModal onChangeOpen={handleCloseModal} />
  ) : null;
};

export default AddOrEditPostPage;
