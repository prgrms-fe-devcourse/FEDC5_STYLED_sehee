/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledContainer, StyledHeader, StyledBody } from './style';
import { ConversationListProps } from './type';
import Icon from '@/Components/Base/Icon';
import MessageModal from '../MessageModal';
import { ConversationType } from '@/Types/ConversationType';
import UserCard from '@/Components/Common/UserCard';
import DirectMessageSkeleton from '../Skeleton';
import { UserType } from '@/Types/UserType';
import { calculateDate } from '@/Utils/UTCtoKST';
import Button from '@/Components/Base/Button';
import { useFetchConversations, useReadMessage } from '@/Hooks/Api/Message';
import useMessageReceiver from '@/Stores/MessageReceiver';

const ConversationList = ({
  loginUser,
  isMobileSize,
}: ConversationListProps) => {
  const navigator = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { conversations, isConversationsLoading } = useFetchConversations();
  const { mutateReadMessage } = useReadMessage();

  const { setReceiver, setIsClickedUserCard } = useMessageReceiver();

  const getReceiver = (conversation: ConversationType) => {
    return conversation.receiver._id === loginUser._id
      ? conversation.sender
      : conversation.receiver;
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [conversations]);

  const handleClickUser = (newReceiver: UserType) => {
    setReceiver(newReceiver);
    mutateReadMessage(newReceiver._id);
    setIsClickedUserCard(true);
  };

  const handleClickMyName = () => {
    navigator(`/profile/${loginUser._id}`);
  };

  return (
    <StyledContainer>
      <StyledHeader>
        {isConversationsLoading ? (
          <DirectMessageSkeleton.Header />
        ) : (
          <>
            <UserCard
              mode="header"
              coverImageUrl={loginUser.image || ''}
              avatarSize={40}
              userName={`${loginUser.fullName} (나)`}
              userNameSize="1.7rem"
              onClick={handleClickMyName}
              className="conversation-list-header"
            />
            <Button
              width="3rem"
              height="3rem"
              borderRadius="0"
              backgroundColor="transparent"
              hoverBackgroundColor="transparent"
              onClick={() => setIsModalOpen(true)}
            >
              <Icon
                name="edit_square"
                isFill={false}
                className="create-message-icon"
              />
            </Button>
          </>
        )}
      </StyledHeader>

      <StyledBody>
        {isLoading || isConversationsLoading || !conversations ? (
          <DirectMessageSkeleton.UserCard length={10} />
        ) : (
          conversations.map((conversation) => {
            const user = getReceiver(conversation);
            const date = calculateDate(conversation.createdAt);

            return (
              <UserCard
                key={user._id}
                mode="chat"
                isRead={
                  conversation.sender._id === loginUser._id
                    ? true
                    : conversation.seen
                }
                coverImageUrl={user.image}
                avatarSize={40}
                userName={user.fullName}
                userNameSize="1.7rem"
                userDetail={conversation.message}
                date={date}
                onClick={() => handleClickUser(user)}
                style={{
                  cursor: 'pointer',
                  paddingLeft: '2rem',
                }}
              />
            );
          })
        )}
      </StyledBody>
      {isModalOpen && (
        <MessageModal
          setIsModalOpen={setIsModalOpen}
          loginUser={loginUser}
          isMobileSize={isMobileSize}
        />
      )}
    </StyledContainer>
  );
};

export default ConversationList;
