import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from '../type';
import Icon from '@/Components/Base/Icon';

const MyProfileInfo = ({ name, id }: NameProps) => {
  return (
    <StyledButtonContainer>
      <StyledName>
        {name}
        <Icon
          name="edit"
          isFill={false}
          style={{ paddingLeft: '1rem', cursor: 'pointer' }}
          onClick={() => console.log('edit user name')}
        />
      </StyledName>
      <Link to={`/edit-password/${id}`}>
        <Button
          type="button"
          height="3rem"
          textSize="1.4rem"
          width="10rem"
          borderRadius="1rem"
          style={{ marginRight: '1rem', marginTop: '.5rem' }}
        >
          비밀번호 변경
        </Button>
      </Link>
    </StyledButtonContainer>
  );
};

export default MyProfileInfo;
