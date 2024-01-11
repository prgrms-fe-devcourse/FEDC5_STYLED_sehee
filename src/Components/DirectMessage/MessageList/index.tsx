/* eslint-disable no-underscore-dangle */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertContainer,
  MessageItemContainer,
  StyledBody,
  StyledContainer,
  StyledHeader,
} from './style';
import Input from '@/Components/Base/Input';
import MessageItem from '../MessageItem';
import { MessageListProps } from './type';
import { useFetchMessages } from '@/Hooks/Api/Message';
import { createMessage } from '@/Services/Message';
import DirectMessageSkeleton from '../Skeleton';
import { sendNotifications } from '@/Services/Notification';
import Alert from '@/Components/Common/Alert';
import UserCard from '@/Components/Common/UserCard';

const MessageList = ({
  receiver,
  conversationsRefetch,
  loginUser,
}: MessageListProps) => {
  const { messages, isMessagesLoading, messagesRefetch } = useFetchMessages(
    receiver._id,
  );
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigator = useNavigate();

  // 선택한 채팅방이 달라질 때마다 messages를 다시 가지고 온다.
  useEffect(() => {
    if (receiver?._id) {
      messagesRefetch();
    }
  }, [receiver, messagesRefetch]);

  // 메세지를 보낼 때마다 채팅창을 맨 아래로 스크롤을 고정 시킨다.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 입력 시 이벤트가 2번 발생하는 현상 방지
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      if (!inputRef || !inputRef.current) {
        return;
      }
      // 빈칸 예외 처리
      if (inputRef.current.value.trim().length === 0) {
        return;
      }

      const content = inputRef.current.value.trim();
      inputRef.current.value = '';

      const message = await createMessage({
        message: content,
        receiver: receiver._id,
      });

      if (!message) {
        setIsAlertOpen(true);
        return;
      }

      // 상대방에게 알림을 보낸다.
      const notification = await sendNotifications({
        notificationType: 'MESSAGE',
        notificationTypeId: message._id,
        userId: receiver._id,
        postId: null,
      });

      if (!notification) {
        setIsAlertOpen(true);
        return;
      }

      // 사이드바의 마지막 메시지와 현재 messages를 갱신
      conversationsRefetch();
      messagesRefetch();
    }
  };

  const handleClickMyName = () => {
    navigator(`/profile/${receiver._id}`);
  };

  return (
    <StyledContainer>
      {isMessagesLoading || !messages || isAlertOpen ? (
        <>
          <DirectMessageSkeleton.MessageList />
          {isAlertOpen && (
            <Alert
              width={40}
              message={
                <AlertContainer>
                  <div>잠시 네트워크에 문제가 생겼습니다.</div>
                  <div>다시 시도해주세요.</div>
                </AlertContainer>
              }
              onChangeOpen={setIsAlertOpen}
            />
          )}
        </>
      ) : (
        <>
          <StyledHeader>
            <UserCard
              mode="header"
              coverImageUrl={receiver.image || ''}
              avatarSize={40}
              userName={receiver.fullName}
              userNameSize="1.5rem"
              onClick={handleClickMyName}
              style={{}}
            />
          </StyledHeader>
          <StyledBody ref={scrollRef}>
            {messages.map((message, index) => (
              <MessageItemContainer key={message._id}>
                <MessageItem.Date
                  messages={messages}
                  index={index}
                />
                <MessageItem.Message
                  message={message}
                  myId={loginUser._id || ''}
                />
              </MessageItemContainer>
            ))}
            <Input
              ref={inputRef}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="메시지 입력..."
              style={{
                position: 'fixed',
                width: '60%',
                right: '5%',
                bottom: '5%',
                padding: '1.5rem 3rem 1.5rem 3rem',
                borderRadius: '3rem',
              }}
            />
          </StyledBody>
        </>
      )}
    </StyledContainer>
  );
};

export default MessageList;
