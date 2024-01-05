/* eslint-disable no-underscore-dangle */
import { useEffect, useRef } from 'react';
import Avatar from '@/Components/Base/Avatar';
import { StyledBody, StyledContainer, StyledHeader } from './style';
import Input from '@/Components/Base/Input';
import MessageItem from './MessageItem';
import { MessagesContainerProps } from './type';
import { useFetchMessages } from '@/Hooks/Api/Message';
import { createMessage } from '@/Services/Message';

const MessagesContainer = ({
  receiver,
  conversationsRefetch,
}: MessagesContainerProps) => {
  const { messages, messagesRefetch } = useFetchMessages(receiver._id);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 리렌더링이 될 때마다 messages를 다시 가지고 온다.
    if (receiver?._id) {
      messagesRefetch();
    }
    // 메세지를 보낼 때마다 채팅창을 맨 아래로 스크롤을 고정 시킨다.
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

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

      const message = inputRef.current.value.trim();
      inputRef.current.value = '';
      await createMessage({ message, receiver: receiver._id });

      // 사이드바의 마지막 메시지를 갱신
      conversationsRefetch();
    }
  };

  return (
    <StyledContainer>
      {!messages ? undefined : (
        <>
          <StyledHeader>
            <Avatar
              src={receiver.image || ''}
              size={50}
            />
            <div>{receiver.fullName}</div>
          </StyledHeader>
          <StyledBody ref={scrollRef}>
            {messages.map((message) => (
              <MessageItem
                key={message._id}
                message={message}
              />
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

export default MessagesContainer;
