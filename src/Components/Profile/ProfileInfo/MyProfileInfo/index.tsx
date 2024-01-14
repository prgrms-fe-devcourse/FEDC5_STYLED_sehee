import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from './type';
import Icon from '@/Components/Base/Icon';
import UpdateNameModal from '../../UpdateNameModal';

const MyProfileInfo = ({ name, id }: NameProps) => {
  const [isUpdateName, setIsUpdateName] = useState(false);

  return (
    <>
      <StyledButtonContainer>
        <StyledName>
          {name}
          <Icon
            name="edit"
            isFill={false}
            style={{ paddingLeft: '1rem', cursor: 'pointer' }}
            onClick={() => setIsUpdateName(true)}
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
      {isUpdateName && (
        <UpdateNameModal
          name={name}
          handleCloseModal={() => setIsUpdateName(false)}
        />
      )}
    </>
  );
};

export default MyProfileInfo;
