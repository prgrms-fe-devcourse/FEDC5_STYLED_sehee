import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const LinkButton = ({ name, link, setLink, style, children }: Props) => {
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={setLink}
      style={{
        position: 'relative',
      }}
    >
      {children}
      <Link to={link}>
        <Icon
          isFill={false}
          name={name}
          style={style}
        />
      </Link>
    </Button>
  );
};

export default LinkButton;
