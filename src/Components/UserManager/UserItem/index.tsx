import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ForwardedRef, forwardRef } from 'react';
import Avatar from '@/Components/Base/Avatar';
import Badge from '@/Components/Base/Badge';
import DEFAULT_USER_IMAGE_SRC from '@/Constants/defaultUserImage';
import useAuthUserStore from '@/Stores/AuthUser';
import { StyledContainer, StyledUserName } from './style';
import { Props } from './type';

const UserItem = forwardRef(
  (
    { id, image, isOnline, fullName }: Props,
    ref: ForwardedRef<HTMLLIElement>,
  ) => {
    const {
      user: { _id: authId },
    } = useAuthUserStore();
    const { colors } = useTheme();
    const navigate = useNavigate();

    const handleOnClick = () => {
      navigate(`/profile/${id}`);
    };

    return (
      <StyledContainer
        $isOnline={isOnline}
        $isAuth={authId === id}
        onClick={handleOnClick}
        ref={ref}
      >
        <Avatar
          src={image || DEFAULT_USER_IMAGE_SRC}
          alt="사용자 이미지"
          size={40}
          wrapperProps={{ style: { flexShrink: 0 } }}
        >
          {isOnline && (
            <Badge
              position="rightBottom"
              size="1.2rem"
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
