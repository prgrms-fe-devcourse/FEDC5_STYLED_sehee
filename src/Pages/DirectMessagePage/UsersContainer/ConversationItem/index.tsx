/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import StyledContainer from './style';
import { ConversationItemProps } from './type';
import { myId } from '../../DUMMY_DATA';
import UserItem from '../UserItem';

const ConversationItem = ({ conversation, onClick }: ConversationItemProps) => {
  // 마지막으로 보낸 메세지를 받은 사람이 receiver, 마지막으로 보낸 메세지를 보낸 사람이 sender
  const [receiver, setReceiver] = useState(conversation.receiver);
  useEffect(() => {
    setReceiver(
      conversation.receiver._id === myId
        ? conversation.sender
        : conversation.receiver,
    );
  }, [conversation]);

  return (
    <StyledContainer onClick={() => onClick(receiver)}>
      <UserItem
        imageUrl={receiver.image}
        userName={receiver.fullName}
        body={conversation.message}
      />
    </StyledContainer>
  );
};

export default ConversationItem;
