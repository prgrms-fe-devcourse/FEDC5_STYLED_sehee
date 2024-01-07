import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ForwardedRef, forwardRef } from 'react';
import Avatar from '@/Components/Base/Avatar';
import { Props } from './type';
import Badge from '@/Components/Base/Badge';
import { StyledContainer, StyledUserName } from './style';

const UserItem = forwardRef(
  (
    { id, coverImage, isOnline, fullName }: Props,
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const { colors } = useTheme();
    const navigator = useNavigate();
    const defaultImage =
      'https://user-images.githubusercontent.com/17202261/101670093-195d9180-3a96-11eb-9bd4-9f31cbe44aea.png';

    const handleOnClick = () => {
      navigator(`/user/${id}`);
    };

    return (
      <StyledContainer
        $isOnline={isOnline}
        onClick={handleOnClick}
        ref={ref}
      >
        <Avatar
          src={coverImage || defaultImage}
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
