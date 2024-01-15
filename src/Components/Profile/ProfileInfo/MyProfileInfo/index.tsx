import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from './type';
import Icon from '@/Components/Base/Icon';
import UpdateNameModal from '../../UpdateNameModal';

const MyProfileInfo = ({ name, id }: NameProps) => {
  const [isUpdateName, setIsUpdateName] = useState(false);
  const navigate = useNavigate();

  const handleClickPassword = () => {
    navigate(`/profile/${id}/edit-password/${id}`);
  };

  const { colors } = useTheme();

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
        <Button
          type="button"
          height="3rem"
          textSize="1.4rem"
          width="10rem"
          borderRadius="1rem"
          style={{
            marginRight: '1rem',
            marginTop: '.5rem',
            border: `1px solid ${colors.text}`,
          }}
          onClick={handleClickPassword}
        >
          비밀번호 변경
        </Button>
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
