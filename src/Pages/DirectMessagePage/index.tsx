/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { StyledContainer, StyledDiv } from './style';
import MessagesContainer from './MessagesContainer';
import UsersContainer from './UsersContainer';
import { useFetchConversations } from '@/Hooks/Api/Message';
import { UserType } from '@/Types/UserType';

const DirectMessagePage = () => {
  const { conversations, isConversationsLoading, conversationsRefetch } =
    useFetchConversations();
  const [receiver, setReceiver] = useState<UserType | null>(null);

  return (
    <StyledContainer>
      <UsersContainer
        setReceiver={setReceiver}
        conversations={conversations}
        isConversationsLoading={isConversationsLoading}
      />
      {!receiver ? (
        <StyledDiv>친구에게 메시지를 보내보세요!</StyledDiv>
      ) : (
        <MessagesContainer
          receiver={receiver}
          conversationsRefetch={conversationsRefetch}
        />
      )}
    </StyledContainer>
  );
};

export default DirectMessagePage;
