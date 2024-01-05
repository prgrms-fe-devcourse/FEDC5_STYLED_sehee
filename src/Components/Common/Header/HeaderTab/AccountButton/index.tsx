import { useState } from 'react';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';

const AccountButton = ({ ...props }) => {
  const [drop, setDrop] = useState(false);

  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
      onClick={() => setDrop(true)}
    >
      <Icon
        name="account_circle"
        isFill={false}
        {...props}
      />
      {drop && true}
    </Button>
  );
};

export default AccountButton;
