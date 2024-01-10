import { useNavigate } from 'react-router-dom';
import Avatar from '@/Components/Base/Avatar';
import { Props } from './type';
import defaultUSerImage from '@/Constants/defaultUserImage';
import {
  StyledContainer,
  StyledDate,
  StyledIsSeen,
  StyledItem,
  StyledText,
} from './style';

const NotificationItem = ({ src, text, date, type, typeId, isSeen }: Props) => {
  const navigator = useNavigate();

  const handleOnClick = () => {
    if (type === 'comment' || type === 'post') {
      navigator(`/detail-modal/${typeId}`);
    }

    if (type === 'follow') {
      navigator(`/profile/${typeId}`);
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
