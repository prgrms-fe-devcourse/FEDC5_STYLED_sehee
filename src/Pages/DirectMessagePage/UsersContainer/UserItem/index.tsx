/* eslint-disable no-underscore-dangle */
import Avatar from '@/Components/Base/Avatar';
import {
  StyledUserName,
  StyledWrapper,
  StyledItemWrapper,
  StyledBody,
} from './style';
import { UserItemProps } from './type';

const UserItem = ({
  imageUrl = '',
  userName,
  body,
  children,
}: UserItemProps) => {
  return (
    <StyledWrapper>
      <Avatar
        src={imageUrl}
        size={50}
      />
      <StyledItemWrapper>
        <StyledUserName>{userName}</StyledUserName>
        <StyledBody>{body}</StyledBody>
      </StyledItemWrapper>
      {children}
    </StyledWrapper>
  );
};

export default UserItem;
