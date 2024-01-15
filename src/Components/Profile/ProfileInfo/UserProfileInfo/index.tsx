/* eslint-disable no-underscore-dangle */
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import Button from '@/Components/Base/Button';
import { StyledButtonContainer, StyledName } from '../style';
import { NameProps } from './type';
import useMessageReceiver from '@/Stores/MessageReceiver';
import { followUser, unfollowUser } from '@/Services/Follow';
import { sendNotifications } from '@/Services/Notification';

const UserProfileInfo = ({ name, user, isFollowing }: NameProps) => {
  const { setReceiver } = useMessageReceiver();
  const { colors } = useTheme();

  const handleFollow = async () => {
    // 이미 팔로우 중이면 언팔로우
    if (isFollowing) {
      await unfollowUser(isFollowing._id);
    }
    // 아직 팔로우 안했으면 팔로우
    else {
      const data = await followUser(user._id);
      if (!data) return;
      await sendNotifications({
        notificationType: 'FOLLOW',
        notificationTypeId: data._id,
        userId: user._id,
        postId: null,
      });
    }
  };

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
          onClick={handleFollow}
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
          onClick={handleFollow}
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
