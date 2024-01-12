import { styled } from 'styled-components';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const ModalButton = ({ style, name, color, setModalOpen, children }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
      onClick={setModalOpen}
      style={{
        height: '93.5%',
        borderBottom: `3px solid ${color}`,
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
