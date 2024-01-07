import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import Props from './type';

const LinkButton = ({ isFill, name, link, setLink, style }: Props) => {
  const { colors } = useTheme();
  return (
    <Button
      backgroundColor="transparent"
      width="fit-content"
      type="button"
      hoverBackgroundColor="transparent"
      hoverTextColor="transparent"
      borderRadius="0"
      onClick={setLink}
      style={
        isFill
          ? {
              height: '100%',
              borderBottom: `3px solid ${colors.primary}`,
            }
          : { height: '100%', borderBottom: `3px solid ${colors.background}` }
      }
    >
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
