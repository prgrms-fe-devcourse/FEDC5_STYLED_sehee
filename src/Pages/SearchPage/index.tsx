import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchModal from '../../Components/SearchModal';
import useTabStore from '@/Stores/Tab';

const SearchPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { prev, setTab } = useTabStore();

  const naviagte = useNavigate();
  const handleCloseModal = (state: boolean) => {
    naviagte(-1);
    setIsModalOpen(state);
    setTab(prev);
  };

  return isModalOpen ? <SearchModal onChangeOpen={handleCloseModal} /> : null;
};

export default SearchPage;
