import styled, { useTheme } from 'styled-components';
import Avatar from '@/Components/Base/Avatar';
import { Props } from './type';
import Badge from '@/Components/Base/Badge';

const StyledContainer = styled.li``;

const UserItem = ({ coverImage, isOnline, fullName }: Props) => {
  const { colors } = useTheme();

  return (
    <StyledContainer>
      <Avatar
        src={coverImage}
        className="user-avatar"
        size={30}
      >
        {!isOnline && (
          <Badge
            position="rightBottom"
            backgroundColor={colors.online}
            style={{ border: `1px solid ${colors.background}` }}
          />
        )}
      </Avatar>
      <StyledUserInfoContainer>
        <StyledUserName>{fullName}</StyledUserName>
      </StyledUserInfoContainer>
    </StyledContainer>
  );
};

export default UserItem;
