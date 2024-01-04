import { useState } from 'react';
import Button from '@/Components/Base/Button';
import AlarmModal from '@/Components/Common/Modal/AlarmModal';
import Icon from '@/Components/Base/Icon';

const AlarmButton = ({ ...props }) => {
  const [alarm, setAlarm] = useState(false);

  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
      onClick={() => setAlarm(true)}
    >
      <Icon
        name="notifications"
        isFill={false}
        {...props}
      />
      {alarm && <AlarmModal onChangeOpen={() => setAlarm(false)} />}
    </Button>
  );
};

export default AlarmButton;
