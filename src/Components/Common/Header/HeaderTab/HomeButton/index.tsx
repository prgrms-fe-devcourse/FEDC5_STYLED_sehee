import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from '../type';

const HomeButton = ({ ...props }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={() => {}}
    >
      <Link to="/">
        <Icon
          name="home"
          isFill={false}
          {...props}
        />
      </Link>
    </Button>
  );
};

export default HomeButton;
