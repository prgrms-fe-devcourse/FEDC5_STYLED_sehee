import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddOrEditPostModal from '@/Components/Common/Modal/AddOrEditPostModal';
import useTabStore from '@/Stores/Tab';
import Alert from '@/Components/Common/Alert';
import useResize from '@/Hooks/useResize';

const AddOrEditPostPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { isMobileSize } = useResize();
  const { prev, setTab } = useTabStore();
  const [alertMessage, setAlertMessage] = useState<string>('');
  const naviagte = useNavigate();

  const handleOpenAlert = () => {
    setAlertMessage('정말로 나가시겠습니까?');
  };

  const handleCloseModal = () => {
    naviagte(-1);
    setIsModalOpen(false);
    setTab(prev);
  };

  const handleCloseAlert = () => {
    setAlertMessage('');
  };

  return isModalOpen ? (
    <>
      {alertMessage && (
        <Alert
          width={isMobileSize ? 40 : undefined}
          mode="confirm"
          message={alertMessage}
          onConfirm={handleCloseModal}
          onChangeOpen={handleCloseAlert}
          onCancle={handleCloseAlert}
        />
      )}
      <AddOrEditPostModal onChangeOpen={handleOpenAlert} />
    </>
  ) : null;
};

export default AddOrEditPostPage;
