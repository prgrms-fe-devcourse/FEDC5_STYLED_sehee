/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { StyledContainer, StyledHeader, StyledBody } from './style';
import { UsersContainerProps } from './type';
import ConversationItem from './ConversationItem';
import Icon from '@/Components/Base/Icon';
import MessageModal from './MessageModal';

const UsersContainer = ({
  setReceiver,
  conversations,
  isConversationsLoading,
}: UsersContainerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledContainer>
      <StyledHeader>
        {/* @TODO: 추후에 본인 이름 넣도록 변경 예정 */}
        <div>my-name</div>
        <Icon
          onClick={() => setIsModalOpen(true)}
          name="edit_square"
          isFill={false}
          style={{ cursor: 'pointer' }}
        />
      </StyledHeader>

      <StyledBody>
        {isConversationsLoading
          ? undefined
          : conversations?.map((conversation) => (
              <ConversationItem
                key={conversation.receiver._id}
                conversation={conversation}
                onClick={setReceiver}
              />
            ))}
      </StyledBody>
      {isModalOpen && (
        <MessageModal
          setReceiver={setReceiver}
          onChangeOpen={setIsModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </StyledContainer>
  );
};

export default UsersContainer;
