import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const ModalButton = ({ style, name, isFill, setModalOpen }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
      onClick={setModalOpen}
    >
      <Icon
        name={name}
        isFill={isFill}
        style={style}
      />
    </Button>
  );
};

export default ModalButton;
