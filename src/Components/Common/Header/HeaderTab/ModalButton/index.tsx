import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const ModalButton = ({ style, name, color, setModalOpen, children }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      height="3.5rem"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
      onClick={setModalOpen}
      style={{
        position: 'relative',
      }}
    >
      {children}
      <Icon
        isFill={false}
        name={name}
        style={style}
      />
    </Button>
  );
};

export default ModalButton;
