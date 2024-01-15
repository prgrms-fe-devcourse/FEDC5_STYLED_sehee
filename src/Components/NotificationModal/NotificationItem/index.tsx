import { useNavigate } from 'react-router-dom';
import Avatar from '@/Components/Base/Avatar';
import { Props } from './type';
import defaultUSerImage from '@/Constants/defaultUserImage';
import useMessageReceiver from '@/Stores/MessageReceiver';

import {
  StyledContainer,
  StyledDate,
  StyledIsSeen,
  StyledItem,
  StyledText,
} from './style';

const NotificationItem = ({
  src,
  author,
  text,
  date,
  type,
  typeId,
  isSeen,
  onClose,
}: Props) => {
  const { setReceiver } = useMessageReceiver();
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (type === 'comment' || type === 'post') {
      onClose();
      navigate(`/modal-detail/${typeId}`);
    }

    if (type === 'follow') {
      onClose();
      navigate(`/profile/${typeId}`);
    }

    if (type === 'message') {
      onClose();
      setReceiver(author);
      navigate('/directmessage');
    }
  };

  return (
    <StyledItem
      onClick={handleOnClick}
      $isSeen={isSeen}
    >
      <Avatar
        src={src || defaultUSerImage}
        alt="사용자 이미지"
        size={50}
        wrapperProps={{ style: { flexShrink: 0 } }}
      />
      <StyledContainer>
        <StyledText>{text}</StyledText>
        <StyledDate>{date} 전</StyledDate>
      </StyledContainer>
      {!isSeen && <StyledIsSeen />}
    </StyledItem>
  );
};

export default NotificationItem;
