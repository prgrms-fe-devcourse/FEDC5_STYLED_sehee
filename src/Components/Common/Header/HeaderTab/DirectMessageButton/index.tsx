import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';

const DirectMessageButton = ({ ...props }) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      borderRadius="0"
      hoverBackgroundColor="transparent"
    >
      <Link to="/directmessage">
        <Icon
          name="send"
          isFill={false}
          {...props}
        />
      </Link>
    </Button>
  );
};

export default DirectMessageButton;
