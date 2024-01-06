import { useTheme } from 'styled-components';
import { ForwardedRef, MouseEvent, forwardRef } from 'react';
import Avatar from '@/Components/Base/Avatar';
import {
  StyledUserInfoContainer,
  StyledWrapper,
  StyledUserName,
  StyledUserDetail,
  StyledUserReadContainer,
  StyledUserFollowContainer,
} from './style';
import { UserCardProps } from './type';
import Badge from '@/Components/Base/Badge';
import Button from '@/Components/Base/Button';

/**
 * @param coverImageUrl 아바타 이미지 url
 * @param avatarSize 아바타 이미지 사이즈 (px)
 * @param badgeSize 배지 사이즈 (rem)
 * @param isOnline 유저 온라인 여부
 * @param isRead 유저 채팅 읽음 여부
 * @param onClick 내부 요소 클릭 이벤트 추출하는 함수
 */
const UserCard = forwardRef(
  (
    {
      width,
      height,
      borderRadius,
      mode = 'normal',
      coverImageUrl,
      avatarSize = 30,
      badgeSize = '0.8rem',
      isOnline = false,
      isRead = false,
      isFollow = false,
      userName = '',
      userDetail = null,
      userNameSize,
      userNameWeight,
      userDetailSize,
      onClick,
      ...props
    }: UserCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { colors, size, fontWeight } = useTheme();

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      if (onClick && e.target === e.currentTarget) {
        onClick(e);
      }
    };

    return (
      <StyledWrapper
        ref={ref}
        $width={width || '100%'}
        $height={height || '100%'}
        $borderRadius={borderRadius || ''}
        {...props}
      >
        <Avatar
          src={coverImageUrl || ''}
          className="user-avatar"
          size={avatarSize}
          onClick={handleClick}
        >
          {isOnline && (
            <Badge
              position="rightBottom"
              size={badgeSize}
              backgroundColor={colors.online}
              style={{ border: `1px solid ${colors.background}` }}
              onClick={handleClick}
            />
          )}
        </Avatar>
        <StyledUserInfoContainer>
          <StyledUserName
            fontSize={userNameSize || size.small}
            fontWeight={userNameWeight || fontWeight.medium}
            onClick={handleClick}
          >
            {userName}
          </StyledUserName>
          {userDetail && (
            <StyledUserDetail
              fontSize={userDetailSize || '0.8rem'}
              onClick={handleClick}
            >
              {userDetail}
            </StyledUserDetail>
          )}
        </StyledUserInfoContainer>
        {mode === 'follow' && (
          <StyledUserFollowContainer>
            <Button
              width="100%"
              height="2rem"
              className="follow-button"
              borderRadius="0.5rem"
              backgroundColor={isFollow ? colors.read : colors.follow}
              hoverBackgroundColor={colors.buttonClickHover}
            >
              {isFollow ? '팔로잉' : '팔로우'}
            </Button>
          </StyledUserFollowContainer>
        )}
        {(mode === 'chat' || mode === 'alarm') && (
          <StyledUserReadContainer $badgeSize={badgeSize}>
            {!isRead && (
              <Badge
                position="leftTop"
                size={badgeSize}
                backgroundColor={colors.read}
                style={{ border: `1px solid ${colors.background}` }}
                onClick={handleClick}
              />
            )}
          </StyledUserReadContainer>
        )}
      </StyledWrapper>
    );
  },
);

UserCard.displayName = 'UserCard';

export default UserCard;
