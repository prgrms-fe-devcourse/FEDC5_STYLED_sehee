/* eslint-disable no-underscore-dangle */

import Avatar from '@/Components/Base/Avatar';
// import { myId } from '../DUMMY_DATA';
import {
  StyledMessageWrapper,
  StyledMessageItem,
  StyledTime,
  StyledDate,
} from './style';
import { MessageType } from '@/Types/MessageType';
import { convertUtcToKstDate, convertUtcToKstTime } from '@/Utils/UTCtoKST';

const Date = ({
  index,
  messages,
}: {
  index: number;
  messages: MessageType[];
}) => {
  // 채팅 날짜가 바뀔 때마다 위에 날짜를 표기해준다.
  const isNewDay = (prevDate: string, nextDate: string) => {
    return convertUtcToKstDate(prevDate) !== convertUtcToKstDate(nextDate);
  };

  return (
    <>
      {index === 0 && (
        <StyledDate>
          {convertUtcToKstDate(messages[index].createdAt)}
        </StyledDate>
      )}
      {index - 1 >= 0 &&
        isNewDay(messages[index - 1].createdAt, messages[index].createdAt) && (
          <StyledDate>
            {convertUtcToKstDate(messages[index].createdAt)}
          </StyledDate>
        )}
    </>
  );
};

const Message = ({ message, myId }: { message: MessageType; myId: string }) => {
  const isMyMessage = message.sender._id === myId;

  return (
    <StyledMessageWrapper
      $myId={myId}
      $senderId={message.sender._id}
    >
      {!isMyMessage && (
        <Avatar
          src={message.sender.image || ''}
          size={40}
        />
      )}
      {isMyMessage && (
        <StyledTime>{convertUtcToKstTime(message.createdAt)}</StyledTime>
      )}
      <StyledMessageItem>{message.message}</StyledMessageItem>
      {!isMyMessage && (
        <StyledTime>{convertUtcToKstTime(message.createdAt)}</StyledTime>
      )}
    </StyledMessageWrapper>
  );
};

const MessageItem = {
  Message,
  Date,
};

export default MessageItem;
