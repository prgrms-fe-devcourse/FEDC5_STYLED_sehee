import Skeleton from '@/Components/Base/Skeleton';
import {
  StyledPostCardWrapper,
  StyledPostCardHeader,
  StyledPostCardBody,
  StyledProfileContainer,
} from './style';

const PostCard = () => {
  return (
    <StyledPostCardWrapper>
      <StyledPostCardHeader>
        <StyledProfileContainer>
          <Skeleton.Circle size="4rem" />
          <Skeleton.Paragraph
            line={1}
            height="2rem"
            {...{ style: { width: '30%', margin: '0 2%' } }}
          />
        </StyledProfileContainer>
      </StyledPostCardHeader>
      <Skeleton.Paragraph
        line={3}
        height="2rem"
      />
      <StyledPostCardBody>
        <Skeleton.Box
          width="96%"
          height="96%"
          {...{ style: {} }}
        />
      </StyledPostCardBody>
    </StyledPostCardWrapper>
  );
};

const PostCardSkeletion = {
  PostCard,
};

export default PostCardSkeletion;
