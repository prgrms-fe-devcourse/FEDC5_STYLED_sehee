import Skeleton from '@/Components/Base/Skeleton';
import {
  MessageListContainer,
  MessageListParagraphWrapper,
  MessageListWrapper,
  UserCardContainer,
  UserCardWrapper,
} from './style';
import { UserCardProps } from './type';

const MessageList = () => {
  return (
    <MessageListContainer>
      <MessageListWrapper>
        <Skeleton.Circle size="4rem" />
        <MessageListParagraphWrapper>
          <Skeleton.Paragraph
            line={1}
            style={{ width: '30%', height: '100%' }}
          />
          <Skeleton.Paragraph
            line={1}
            style={{ width: '70%', height: '100%' }}
          />
        </MessageListParagraphWrapper>
      </MessageListWrapper>

      <MessageListWrapper>
        <MessageListParagraphWrapper $isRight>
          <Skeleton.Paragraph
            line={1}
            style={{ width: '80%', height: '100%' }}
          />
          <Skeleton.Paragraph
            line={1}
            style={{ width: '40%', height: '100%' }}
          />
          <Skeleton.Paragraph
            line={1}
            style={{ width: '60%', height: '100%' }}
          />
        </MessageListParagraphWrapper>
        <Skeleton.Circle size="4rem" />
      </MessageListWrapper>

      <MessageListWrapper>
        <Skeleton.Circle size="4rem" />
        <Skeleton.Paragraph
          line={1}
          style={{ width: '40%', height: '100%' }}
        />
      </MessageListWrapper>

      <MessageListWrapper>
        <MessageListParagraphWrapper $isRight>
          <Skeleton.Paragraph
            line={2}
            style={{ width: '70%', height: '100%' }}
          />
        </MessageListParagraphWrapper>
        <Skeleton.Circle size="4rem" />
      </MessageListWrapper>

      <MessageListWrapper>
        <Skeleton.Circle size="4rem" />
        <MessageListParagraphWrapper>
          <Skeleton.Paragraph
            line={1}
            style={{ width: '70%', height: '100%' }}
          />
          <Skeleton.Paragraph
            line={1}
            style={{ width: '40%', height: '100%' }}
          />
        </MessageListParagraphWrapper>
      </MessageListWrapper>
    </MessageListContainer>
  );
};

const UserCard = ({ length = 5 }: UserCardProps) => {
  return (
    <UserCardContainer>
      {Array.from(Array(length), (_, index) => (
        <UserCardWrapper key={index}>
          <Skeleton.Circle size="4rem" />
          <MessageListParagraphWrapper>
            <Skeleton.Paragraph
              line={1}
              style={{ width: '60%', height: '100%' }}
            />
            <Skeleton.Paragraph
              line={1}
              style={{ width: '90%', height: '100%' }}
            />
          </MessageListParagraphWrapper>
        </UserCardWrapper>
      ))}
    </UserCardContainer>
  );
};

const DirectMessageSkeleton = {
  MessageList,
  UserCard,
};

export default DirectMessageSkeleton;
