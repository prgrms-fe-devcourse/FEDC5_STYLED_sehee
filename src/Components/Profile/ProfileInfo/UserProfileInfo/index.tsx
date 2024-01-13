import { Link } from 'react-router-dom';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from './type';

const UserProfileInfo = ({ name }: NameProps) => {
  return (
    <StyledButtonContainer>
      <StyledName>{name}</StyledName>
      {/* 내ㅐ가 팔로우한 사람인지 */}
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
