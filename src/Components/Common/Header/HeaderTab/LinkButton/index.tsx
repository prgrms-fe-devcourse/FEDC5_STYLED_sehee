import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const LinkButton = ({ isFill, name, link, setLink, style }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={setLink}
    >
      <Link to={link}>
        <Icon
          isFill={isFill}
          name={name}
          style={style}
        />
      </Link>
    </Button>
  );
};

export default LinkButton;
