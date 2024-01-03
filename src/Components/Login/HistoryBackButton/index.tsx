import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';

const HistoryBackButton = () => {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
      }}
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
