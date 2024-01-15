import Skeleton from '@/Components/Base/Skeleton';
import {
  StyledAuthorInfo,
  StyledCommentHistory,
  StyledPostMainInfo,
  StyledPostMainTopContainer,
  StyledButtonContainer,
  StyledCommentUserCard,
  StyledLikeContainer,
  StyledUserCard,
} from './style';

const UserCard = () => {
  return (
    <StyledUserCard>
      <Skeleton.Circle size="3rem" />
      <Skeleton.Paragraph line={1} />
    </StyledUserCard>
  );
};

const CommentUserCard = () => {
  return (
    <StyledCommentUserCard>
      <Skeleton.Circle size="3rem" />
      <Skeleton.Paragraph line={1} />
      <Skeleton.Paragraph line={1} />
    </StyledCommentUserCard>
  );
};

const AuthorInfo = () => {
  return (
    <StyledAuthorInfo>
      <UserCard />
    </StyledAuthorInfo>
  );
};

const PostMainInfo = () => {
  return (
    <StyledPostMainInfo>
      <StyledPostMainTopContainer>
        <UserCard />
        <Skeleton.Paragraph
          line={1}
          width=""
        />
      </StyledPostMainTopContainer>
      <StyledCommentHistory>
        댓글
        {Array.from(Array(3), (_, index) => (
          <CommentUserCard key={index} />
        ))}
      </StyledCommentHistory>
    </StyledPostMainInfo>
  );
};

const LikeCommentChat = () => {
  return (
    <>
      <StyledButtonContainer>
        <Skeleton.Circle size="2rem" />
        <Skeleton.Circle size="2rem" />
        <Skeleton.Circle size="2rem" />
      </StyledButtonContainer>
      <StyledLikeContainer>
        <UserCard />
      </StyledLikeContainer>
    </>
  );
};

const PostDetailSkeleton = {
  AuthorInfo,
  PostMainInfo,
  LikeCommentChat,
  UserCard,
};

export default PostDetailSkeleton;
