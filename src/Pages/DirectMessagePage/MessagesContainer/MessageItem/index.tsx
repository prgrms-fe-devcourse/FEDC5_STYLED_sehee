/* eslint-disable no-underscore-dangle */

import Avatar from '@/Components/Base/Avatar';
import { myId } from '../../DUMMY_DATA';
import { StyledMessageWrapper, StyledMessageItem, StyledTime } from './style';
import { MessageType } from '@/Types/MessageType';

const MessageItem = ({ message }: { message: MessageType }) => {
  return (
    <StyledMessageWrapper
      $myId={myId}
      $senderId={message.sender._id}
    >
      {message.sender._id === myId ? undefined : (
        <Avatar
          src={message.sender.image || ''}
          size={30}
        />
      )}
      {message.sender._id === myId ? (
        <StyledTime>{message.createdAt.slice(11, 16)}</StyledTime>
      ) : undefined}
      <StyledMessageItem>{message.message}</StyledMessageItem>
      {message.sender._id !== myId ? (
        <StyledTime>{message.createdAt.slice(11, 16)}</StyledTime>
      ) : undefined}
    </StyledMessageWrapper>
  );
};
export default MessageItem;
