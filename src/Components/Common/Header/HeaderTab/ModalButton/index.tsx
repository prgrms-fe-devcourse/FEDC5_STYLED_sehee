import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const ModalButton = ({ style, name, isFill, setModalOpen }: Props) => {
  const { colors } = useTheme();
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
      onClick={setModalOpen}
      style={
        isFill
          ? {
              height: '100%',
              borderBottom: `3px solid ${colors.primary}`,
            }
          : { height: '100%', borderBottom: `3px solid ${colors.background}` }
      }
    >
      <Icon
        isFill={false}
        name={name}
        style={style}
      />
    </Button>
  );
};

export default ModalButton;
