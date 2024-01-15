import Modal from '@/Components/Common/Modal';

const AlarmModal = ({
  onChangeOpen,
}: {
  onChangeOpen: (state: boolean) => void;
}) => {
  return (
    <Modal
      height={20}
      onChangeOpen={onChangeOpen}
    >
      alarm
    </Modal>
  );
};

export default AlarmModal;
