/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { StyledContainer, StyledDiv } from './style';
import MessageList from '@/Components/DirectMessage/MessageList';
import ConversationList from '@/Components/DirectMessage/ConversationList';
import { useFetchConversations } from '@/Hooks/Api/Message';
import useAuthUserStore from '@/Stores/AuthUser';
import useMessageReceiver from '@/Stores/MessageReceiver';
import useResize from '@/Hooks/useResize';
import useCheckAuth from '@/Hooks/Api/Auth';

const DirectMessagePage = () => {
  const navigator = useNavigate();
  const [isClickedUserCard, setIsClickedUserCard] = useState(false);
  const { conversations, isConversationsLoading, conversationsRefetch } =
    useFetchConversations();
  const { setAuthUser, user } = useAuthUserStore();
  const { receiver, setReceiver } = useMessageReceiver();
  const { isMobileSize } = useResize();
  const { loginUserData, isCheckAuthSuccess } = useCheckAuth();

  useEffect(() => {
    if (!isCheckAuthSuccess) return;
    if (isCheckAuthSuccess && !loginUserData) {
      navigator('/');
      return;
    }
    if (isCheckAuthSuccess && loginUserData) {
      setAuthUser(loginUserData);
    }
  }, [isCheckAuthSuccess, loginUserData, setAuthUser, navigator]);

  const conversationList = (
    <ConversationList
      isMobileSize={isMobileSize}
      setIsClickedUserCard={setIsClickedUserCard}
      setReceiver={setReceiver}
      conversations={conversations}
      isConversationsLoading={isConversationsLoading}
      conversationsRefetch={conversationsRefetch}
      loginUser={user}
    />
  );

  const messageList = receiver && (
    <MessageList
      isMobileSize={isMobileSize}
      isClickedUserCard={isClickedUserCard}
      setIsClickedUserCard={setIsClickedUserCard}
      receiver={receiver}
      conversationsRefetch={conversationsRefetch}
      loginUser={user}
    />
  );

  return (
    <StyledContainer>
      {isMobileSize && (!isClickedUserCard ? conversationList : messageList)}
      {!isMobileSize && (
        <>
          {conversationList}
          {!receiver ? (
            <StyledDiv>친구에게 메시지를 보내보세요!</StyledDiv>
          ) : (
            messageList
          )}
        </>
      )}
      <Outlet />
    </StyledContainer>
  );
};

export default DirectMessagePage;
