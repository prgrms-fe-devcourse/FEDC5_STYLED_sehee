import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';

const LoginButton = ({ ...props }) => {
  return (
    <Link to="/login">
      <Button
        type="button"
        height="4rem"
        textSize="1.65rem"
        width="8rem"
        key="login"
        borderRadius="1rem"
        style={{ marginRight: '1rem' }}
        {...props}
      >
        로그인
      </Button>
    </Link>
  );
};

export default LoginButton;
