import { PostCardProps } from './type';
import {
  StyledPostCardWrapper,
  StyledPostCardHeader,
  StyledPostCardBody,
  StyledProfileAvatar,
  StyledProfileName,
  StyledProfileContainer,
  StyledProfileFollowBtn,
  HeartIconStyle,
  StyledPostCardTitle,
  FillHeartIconStyle,
  StyledPostCardImage,
} from './style';
import Icon from '@/Components/Base/Icon';

const PostCard = ({
  imageUrl,
  content,
  authorName,
  authorCover,
  isFollower,
  isLike,
  width = '80%',
}: PostCardProps) => {
  return (
    <StyledPostCardWrapper width={width}>
      <StyledPostCardHeader>
        <StyledProfileContainer>
          <StyledProfileAvatar
            src={authorCover}
            alt="프로필 아바타"
          />
          <StyledProfileName>{authorName}</StyledProfileName>
          <StyledProfileFollowBtn $isFollower={isFollower}>
            {isFollower ? '팔로잉' : '팔로우'}
          </StyledProfileFollowBtn>
        </StyledProfileContainer>
        <Icon
          name="Favorite"
          style={isLike ? FillHeartIconStyle : HeartIconStyle}
        />
      </StyledPostCardHeader>
      <StyledPostCardTitle>{content}</StyledPostCardTitle>
      <StyledPostCardBody>
        <StyledPostCardImage
          src={imageUrl}
          alt="포스트 카드 이미지"
        />
      </StyledPostCardBody>
    </StyledPostCardWrapper>
  );
};

export default PostCard;
