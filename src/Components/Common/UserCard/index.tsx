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
import Input from '@/Components/Base/Input';

/**
 * @param mode normal, chat, alarm, follow 모드 변경 가능
 * @param coverImageUrl 아바타 이미지 url
 * @param avatarSize 아바타 이미지 사이즈 (px)
 * @param badgeSize 배지 사이즈 (rem)
 * @param isOnline 유저 온라인 여부
 * @param isRead 유저 채팅 읽음 여부
 * @param isFollow 해당 유저 팔로우 여부
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
      date = '',
      userNameSize,
      userNameWeight,
      userDetailSize,
      onClick,
      inputValue,
      inputChecked,
      inputOnChange,
      onClickFollowBtn,
      ...props
    }: UserCardProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { colors, size, fontWeight } = useTheme();

    /**
     * UserCard 내 요소 클릭 시 클릭이벤트 전달용 함수
     * 어떻게 사용 및 확장할지는 추후 결정해야 할듯
     */
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      if (onClick && e.target === e.currentTarget) {
        onClick(e);
      }
    };

    const handleInputClick = () => {
      if (inputOnChange) {
        inputOnChange();
      }
    };

    return (
      <StyledWrapper
        ref={ref}
        $width={width || '100%'}
        $height={height || 'auto'}
        $borderRadius={borderRadius || ''}
        $mode={mode}
        {...props}
        onClick={handleClick}
      >
        {/* 유저 아바타 */}
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
        {/* 유저 아이디 및 세부 상태 정보 */}
        <StyledUserInfoContainer>
          <StyledUserName
            fontSize={userNameSize || size.small}
            fontWeight={
              userNameWeight || (!isRead ? fontWeight.black : fontWeight.medium)
            }
            onClick={handleClick}
          >
            {userName}
          </StyledUserName>
          {userDetail && (
            <StyledUserDetail
              fontSize={userDetailSize || '0.8rem'}
              fontWeight={!isRead ? fontWeight.black : fontWeight.regular}
              onClick={handleClick}
            >
              {userDetail}
              {mode === 'chat' && <div>{date}</div>}
            </StyledUserDetail>
          )}
        </StyledUserInfoContainer>
        {/* follow 모드 시 팔로우 버튼 */}
        {mode === 'follow' && (
          <StyledUserFollowContainer>
            <Button
              width="100%"
              height="2rem"
              className="follow-button"
              borderRadius="0.5rem"
              backgroundColor={isFollow ? colors.read : colors.follow}
              hoverBackgroundColor={colors.buttonHoverBackground}
              onClick={onClickFollowBtn}
            >
              {isFollow ? '팔로잉' : '팔로우'}
            </Button>
          </StyledUserFollowContainer>
        )}
        {/* chat, alarm 모드 시 읽음 배지 */}
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
        {/* radio 모드 시 radio input */}
        {mode === 'radio' && (
          <Input
            type="radio"
            value={inputValue}
            checked={inputChecked}
            onChange={handleInputClick}
          />
        )}
      </StyledWrapper>
    );
  },
);

UserCard.displayName = 'UserCard';

export default UserCard;
