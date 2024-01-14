import { useTheme } from 'styled-components';
import { PostCardProps } from './type';
import {
  StyledPostCardWrapper,
  StyledPostCardHeader,
  StyledPostCardBody,
  StyledProfileAvatar,
  StyledProfileName,
  StyledProfileContainer,
  HeartIconStyle,
  StyledPostCardTitle,
  StyledPostCardImage,
} from './style';
import Icon from '@/Components/Base/Icon';
import Button from '@/Components/Base/Button';
import DEFAULT_USER_IMAGE_SRC from '@/Constants/defaultUserImage';

const PostCard = ({
  postId,
  imageUrl,
  content,
  authorName,
  authorThumbnail,
  isFollower,
  isLike,
  width = '80%',
  fontSize,
  objectFit = 'contain',
  onImageClick,
  onUserNameClick,
  onUserAvatarClick,
  onFollowBtnClick,
  onLikeIconClick,
}: PostCardProps) => {
  const { colors } = useTheme();
  const followBtnBgColor = isFollower ? colors.read : colors.follow;
  const followBtnHoverBgColor = isFollower
    ? 'rgba(0, 149, 246, 0.7)'
    : 'rgba(119, 82, 254, 0.7)';
  const followBtnTextColor = colors.buttonText;

  const handleClickLike = (id: string) => {
    return onLikeIconClick && onLikeIconClick(id, !isLike);
  };

  return (
    <StyledPostCardWrapper
      width={width}
      fontSize={fontSize}
    >
      <StyledPostCardHeader>
        <StyledProfileContainer>
          {/* 아바타 컴포넌트 삽입 필요 */}
          <StyledProfileAvatar
            src={authorThumbnail || DEFAULT_USER_IMAGE_SRC}
            alt="프로필 아바타"
            onClick={onUserAvatarClick}
          />
          <StyledProfileName onClick={onUserNameClick}>
            {authorName}
          </StyledProfileName>
          <Button
            className="follow-btn"
            width="5rem"
            height="2rem"
            borderRadius="0.5rem"
            textSize="1rem"
            textColor={followBtnTextColor}
            backgroundColor={followBtnBgColor}
            hoverBackgroundColor={followBtnHoverBgColor}
            onClick={onFollowBtnClick}
          >
            {isFollower ? '팔로잉' : '팔로우'}
          </Button>
        </StyledProfileContainer>
        <Icon
          name={isLike ? 'favorite' : 'favorite_border'}
          style={{ color: `${colors.alert}`, ...HeartIconStyle }}
          onClick={() => handleClickLike(postId)}
        />
      </StyledPostCardHeader>
      <StyledPostCardTitle>{content}</StyledPostCardTitle>
      <StyledPostCardBody onClick={onImageClick}>
        <StyledPostCardImage
          src={imageUrl}
          alt="포스트 카드 이미지"
          $objectFit={objectFit}
        />
      </StyledPostCardBody>
    </StyledPostCardWrapper>
  );
};

export default PostCard;
