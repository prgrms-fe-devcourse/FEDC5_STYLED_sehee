/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledContainer, StyledHeader, StyledBody } from './style';
import { ConversationListProps } from './type';
import Icon from '@/Components/Base/Icon';
import MessageModal from '../MessageModal';
import { ConversationType } from '@/Types/ConversationType';
// import { myId } from '@/Components/DirectMessage/DUMMY_DATA';
import UserCard from '@/Components/Common/UserCard';
import DirectMessageSkeleton from '../Skeleton';
import { UserType } from '@/Types/UserType';
import { readMessage } from '@/Services/Message';
import { calculateDate } from '@/Utils/UTCtoKST';

const ConversationList = ({
  setReceiver,
  conversations,
  isConversationsLoading,
  conversationsRefetch,
  loginUser,
}: ConversationListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigator = useNavigate();

  const getReceiver = (conversation: ConversationType) => {
    return conversation.receiver._id === loginUser._id
      ? conversation.sender
      : conversation.receiver;
  };

  const handleClickUser = async (receiver: UserType) => {
    setReceiver(receiver);
    await readMessage(receiver._id);
    conversationsRefetch();
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
        <Icon
          onClick={() => setIsModalOpen(true)}
          name="edit_square"
          isFill={false}
          style={{ cursor: 'pointer' }}
        />
      </StyledHeader>

      <StyledBody>
        {isConversationsLoading ? (
          <DirectMessageSkeleton.UserCard length={10} />
        ) : (
          conversations?.map((conversation) => {
            const receiver = getReceiver(conversation);
            const date = calculateDate(conversation.createdAt);

            return (
              <div key={receiver._id}>
                <UserCard
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
              </div>
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
        />
      )}
    </StyledContainer>
  );
};

export default ConversationList;
