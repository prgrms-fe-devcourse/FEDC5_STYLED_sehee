import { useTheme } from 'styled-components';
import Skeleton from '@/Components/Base/Skeleton';
import {
  StyledPostCardWrapper,
  StyledPostCardHeader,
  StyledPostCardBody,
  StyledProfileContainer,
} from './style';

const PostCard = () => {
  const { size } = useTheme();

  return (
    <StyledPostCardWrapper>
      <StyledPostCardHeader>
        <StyledProfileContainer>
          <Skeleton.Circle size={size.extraLarge} />
          <Skeleton.Paragraph
            line={1}
            {...{ style: { width: '30%', display: 'flex' } }}
          />
        </StyledProfileContainer>
      </StyledPostCardHeader>
      <Skeleton.Paragraph
        line={1}
        {...{ style: { margin: '0 2%' } }}
      />
      <Skeleton.Paragraph
        line={1}
        {...{ style: { margin: '0 2%', width: '40%' } }}
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
