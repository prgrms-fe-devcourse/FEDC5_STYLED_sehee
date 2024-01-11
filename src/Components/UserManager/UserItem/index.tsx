import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ForwardedRef, forwardRef } from 'react';
import Avatar from '@/Components/Base/Avatar';
import { Props } from './type';
import Badge from '@/Components/Base/Badge';
import { StyledContainer, StyledUserName } from './style';
import DEFAULT_USER_IMAGE_SRC from '@/Constants/defaultUserImage';

const UserItem = forwardRef(
  (
    { id, coverImage, isOnline, fullName }: Props,
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const { colors } = useTheme();
    const navigator = useNavigate();

    const handleOnClick = () => {
      navigator(`/profile/${id}`);
    };

    return (
      <StyledContainer
        $isOnline={isOnline}
        onClick={handleOnClick}
        ref={ref}
      >
        <Avatar
          src={coverImage || DEFAULT_USER_IMAGE_SRC}
          alt="사용자 이미지"
          size={40}
        >
          {isOnline && (
            <Badge
              position="rightBottom"
              backgroundColor={colors.online}
              style={{ border: `1px solid ${colors.background}` }}
            />
          )}
        </Avatar>
        <StyledUserName>{fullName}</StyledUserName>
      </StyledContainer>
    );
  },
);

UserItem.displayName = 'UserItem';

export default UserItem;
