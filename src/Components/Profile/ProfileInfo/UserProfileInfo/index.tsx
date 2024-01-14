import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from './type';
import useMessageReceiver from '@/Stores/MessageReceiver';

const UserProfileInfo = ({ name, user, isFollowing }: NameProps) => {
  const { setReceiver } = useMessageReceiver();
  const { colors } = useTheme();

  return (
    <StyledButtonContainer>
      <StyledName>{name}</StyledName>
      {isFollowing ? (
        <Button
          type="button"
          height="3rem"
          textSize="1.4rem"
          width="7rem"
          borderRadius="1rem"
          backgroundColor={colors.read}
          style={{ marginRight: '1rem', marginTop: '.5rem' }}
        >
          팔로잉
        </Button>
      ) : (
        <Button
          type="button"
          height="3rem"
          textSize="1.4rem"
          width="7rem"
          borderRadius="1rem"
          backgroundColor={colors.follow}
          style={{ marginRight: '1rem', marginTop: '.5rem' }}
        >
          팔로우
        </Button>
      )}

      <Link to="/directmessage">
        <Button
          type="button"
          height="3rem"
          textSize="1.4rem"
          width="10rem"
          borderRadius="1rem"
          style={{ marginRight: '1rem', marginTop: '.5rem' }}
          onClick={() => setReceiver(user)}
        >
          메시지 보내기
        </Button>
      </Link>
    </StyledButtonContainer>
  );
};

export default UserProfileInfo;
