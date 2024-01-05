import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const HistoryBackButton = ({ ...props }: Props) => {
  const navigate = useNavigate();
  const { colors } = useTheme();

  const handleOnClick = () => {
    navigate(-1);
  };

  return (
    <Button
      backgroundColor="transparent"
      onClick={handleOnClick}
      style={{
        width: 'auto',
        height: 'auto',
        ...props.style,
      }}
      className={props.className}
    >
      <Icon
        name="undo"
        isFill={false}
        style={{ fontSize: '5rem', color: colors.primary }}
      />
    </Button>
  );
};

export default HistoryBackButton;
