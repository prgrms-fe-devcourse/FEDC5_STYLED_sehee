import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from '../type';

const UserProfileInfo = ({ name }: NameProps) => {
  return (
    <StyledButtonContainer>
      <StyledName>{name}</StyledName>
      <Button
        type="button"
        height="3rem"
        textSize="1.4rem"
        width="7rem"
        borderRadius="1rem"
        style={{ marginRight: '1rem', marginTop: '.5rem' }}
      >
        팔로우
      </Button>
      {/* 메시지 보내기 버튼 클릭시 어떻게,, 해야할지,,, */}
      <Link to="/directmessage">
        <Button
          type="button"
          height="3rem"
          textSize="1.4rem"
          width="10rem"
          borderRadius="1rem"
          style={{ marginRight: '1rem', marginTop: '.5rem' }}
        >
          메시지 보내기
        </Button>
      </Link>
    </StyledButtonContainer>
  );
};

export default UserProfileInfo;
