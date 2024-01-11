import { useInView } from 'react-intersection-observer';
import { useEffect, memo } from 'react';
import { Props } from './type';
import UserItem from '../UserItem';
import { UserType } from '@/Types/UserType';
import StyledUserList from './style';

const UserList = ({ userList, onlineUserList, loadMoreUsers }: Props) => {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      loadMoreUsers();
    }
  }, [inView, loadMoreUsers]);

  return (
    <StyledUserList>
      {userList.map(({ _id, image, fullName }: UserType, index) => {
        const isLast = userList.length === index + 1;
        const isOnline = onlineUserList.some(
          ({ _id: onlineUserId }: UserType) => onlineUserId === _id,
        );

        return (
          <UserItem
            key={_id}
            id={_id}
            image={image}
            isOnline={isOnline}
            fullName={fullName}
            ref={isLast ? ref : null}
          />
        );
      })}
    </StyledUserList>
  );
};

const MemoizedUserList = memo(UserList);

export default MemoizedUserList;
