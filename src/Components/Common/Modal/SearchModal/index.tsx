import Modal from '@/Components/Common/Modal';

const SearchModal = ({ onChangeOpen }) => {
  return (
    <Modal
      height={20}
      onChangeOpen={onChangeOpen}
    >
      <h1>search</h1>
    </Modal>
  );
};

export default SearchModal;
