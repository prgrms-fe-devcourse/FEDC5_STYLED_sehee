/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { StyledContainer, StyledHeader, StyledBody } from './style';
import { ConversationListProps } from './type';
import Icon from '@/Components/Base/Icon';
import MessageModal from '../MessageModal';
import { ConversationType } from '@/Types/ConversationType';
import UserCard from '@/Components/Common/UserCard';
import DirectMessageSkeleton from '../Skeleton';
import { UserType } from '@/Types/UserType';
import { readMessage } from '@/Services/Message';
import { calculateDate } from '@/Utils/UTCtoKST';
import Button from '@/Components/Base/Button';

const ConversationList = ({
  setReceiver,
  conversations,
  isConversationsLoading,
  conversationsRefetch,
  loginUser,
  setIsClickedUserCard = () => {},
  isMobileSize,
}: ConversationListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigator = useNavigate();
  const { colors } = useTheme();

  const getReceiver = (conversation: ConversationType) => {
    return conversation.receiver._id === loginUser._id
      ? conversation.sender
      : conversation.receiver;
  };

  const handleClickUser = async (receiver: UserType) => {
    setReceiver(receiver);
    await readMessage(receiver._id);
    conversationsRefetch();

    if (isMobileSize && setIsClickedUserCard) {
      setIsClickedUserCard(true);
    }
  };

  const handleClickMyName = () => {
    navigator(`/profile/${loginUser._id}`);
  };

  return (
    <StyledContainer>
      <StyledHeader>
        <UserCard
          mode="header"
          coverImageUrl={loginUser.image || ''}
          avatarSize={40}
          userName={loginUser.fullName}
          userNameSize="1.5rem"
          onClick={handleClickMyName}
          style={{}}
        />
        <Button
          width="3rem"
          height="3rem"
          borderRadius="0"
          backgroundColor={colors.background}
          hoverBackgroundColor={colors.background}
          onClick={() => setIsModalOpen(true)}
        >
          <Icon
            name="edit_square"
            isFill={false}
            className="create-message-icon"
          />
        </Button>
      </StyledHeader>

      <StyledBody>
        {isConversationsLoading ? (
          <DirectMessageSkeleton.UserCard length={10} />
        ) : (
          conversations?.map((conversation) => {
            const receiver = getReceiver(conversation);
            const date = calculateDate(conversation.createdAt);

            return (
              <UserCard
                key={receiver._id}
                mode="chat"
                isRead={
                  conversation.sender._id === loginUser._id
                    ? true
                    : conversation.seen
                }
                coverImageUrl={receiver.image}
                avatarSize={40}
                userName={receiver.fullName}
                userNameSize="1.5rem"
                userDetail={conversation.message}
                date={date}
                onClick={() => handleClickUser(receiver)}
              />
            );
          })
        )}
      </StyledBody>
      {isModalOpen && (
        <MessageModal
          setReceiver={setReceiver}
          onChangeOpen={setIsModalOpen}
          setIsModalOpen={setIsModalOpen}
          loginUser={loginUser}
          isMobileSize={isMobileSize}
          setIsClickedUserCard={setIsClickedUserCard}
        />
      )}
    </StyledContainer>
  );
};

export default ConversationList;
