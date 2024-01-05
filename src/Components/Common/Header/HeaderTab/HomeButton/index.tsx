import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from '../type';

const HomeButton = ({ iconStyle, ...props }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={() => {}}
      {...props}
    >
      <Link to="/">
        <Icon
          name="home"
          isFill={false}
          style={iconStyle}
        />
      </Link>
    </Button>
  );
};

export default HomeButton;
