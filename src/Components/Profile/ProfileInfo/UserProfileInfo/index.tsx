/* eslint-disable no-underscore-dangle */
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useState } from 'react';
import debounce from 'lodash/debounce';
import Button from '@/Components/Base/Button';
import useMessageReceiver from '@/Stores/MessageReceiver';
import { followUser, unfollowUser } from '@/Services/Follow';
import { sendNotifications } from '@/Services/Notification';
import useCheckAuth from '@/Hooks/Api/Auth';
import useFetchUser from '@/Hooks/Api/User';
import { useReadMessage } from '@/Hooks/Api/Message';
import useAuthUserStore from '@/Stores/AuthUser';
import { NotificationTypeList } from '@/Types/Request';
import Alert from '@/Components/Common/Alert';
import NON_AUTH_USER from '@/Constants/nonAuthUser';
import { NameProps } from './type';
import { StyledButtonContainer, StyledName } from '../style';

const UserProfileInfo = ({ name, user, isFollowing }: NameProps) => {
  const { setReceiver, setIsClickedUserCard } = useMessageReceiver();
  const { colors } = useTheme();
  const { userId } = useParams() || '';
  const { loginUserRefetch } = useCheckAuth();
  const { userDataRefetch } = useFetchUser(userId || '');
  const { mutateReadMessage } = useReadMessage();

  const { user: authUser } = useAuthUserStore();
  const [errorMode, setErrorMode] = useState<NotificationTypeList>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();

  const handleFollow = async () => {
    if (Object.keys(authUser).length === 0) {
      setErrorMode('FOLLOW');
      setIsAlertOpen(true);
      return;
    }
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
    loginUserRefetch();
    userDataRefetch();
  };

  const debouncedHandleFollow = debounce(handleFollow, 300);

  const handleDirectMessage = () => {
    if (Object.keys(authUser).length === 0) {
      setErrorMode('MESSAGE');
      setIsAlertOpen(true);
      return;
    }
    setIsClickedUserCard(true);
    setReceiver(user);
    mutateReadMessage(user._id);
    navigate('/directmessage');
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
          onClick={debouncedHandleFollow}
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
          style={{
            marginRight: '1rem',
            marginTop: '.5rem',
            border: `1px solid ${colors.text}`,
          }}
          onClick={debouncedHandleFollow}
        >
          팔로우
        </Button>
      )}

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
        onClick={handleDirectMessage}
      >
        메시지 보내기
      </Button>
      {isAlertOpen && (
        <Alert
          mode="confirm"
          message={
            <>
              {errorMode === 'FOLLOW' && <div>{NON_AUTH_USER.FOLLOW}</div>}
              {errorMode === 'MESSAGE' && <div>{NON_AUTH_USER.MESSAGE}</div>}
              <div>{NON_AUTH_USER.LOGIN}</div>
            </>
          }
          onConfirm={() => navigate('/login')}
          onCancle={() => setIsAlertOpen(false)}
        />
      )}
    </StyledButtonContainer>
  );
};

export default UserProfileInfo;
