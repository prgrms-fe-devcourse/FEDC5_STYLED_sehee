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

const PostCard = ({
  imageUrl,
  content,
  authorName,
  authorThumbnail,
  isFollower,
  isLike,
  width = '80%',
  fontSize,
  objectFit = 'fill',
}: PostCardProps) => {
  const { colors } = useTheme();
  const followBtnBgColor = isFollower ? colors.read : colors.follow;
  const followBtnHoverBgColor = isFollower
    ? 'rgba(0, 149, 246, 0.7)'
    : 'rgba(119, 82, 254, 0.7)';
  const followBtnTextColor = colors.buttonText;

  return (
    <StyledPostCardWrapper
      width={width}
      fontSize={fontSize}
    >
      <StyledPostCardHeader>
        <StyledProfileContainer>
          {/* 아바타 컴포넌트 삽입 필요 */}
          <StyledProfileAvatar
            src={authorThumbnail}
            alt="프로필 아바타"
          />
          <StyledProfileName>{authorName}</StyledProfileName>
          {/* btn hover 배경색 컴포넌트 수정 필요 */}
          <Button
            className="follow-btn"
            width="5rem"
            height="2rem"
            borderRadius="0.5rem"
            textSize="1rem"
            textColor={followBtnTextColor}
            backgroundColor={followBtnBgColor}
            hoverBackgroundColor={followBtnHoverBgColor}
          >
            {isFollower ? '팔로잉' : '팔로우'}
          </Button>
        </StyledProfileContainer>
        <Icon
          name={isLike ? 'favorite' : 'favorite_border'}
          style={{ color: `${colors.alert}`, ...HeartIconStyle }}
        />
      </StyledPostCardHeader>
      <StyledPostCardTitle>{content}</StyledPostCardTitle>
      <StyledPostCardBody>
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
