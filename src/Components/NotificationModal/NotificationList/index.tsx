import { StyledNonList, StyledNotificationList } from './style';
import { Props } from './type';
import NotificationItem from '../NotificationItem/index';

const NotificationList = ({ list }: Props) => {
  return (
    <StyledNotificationList>
      {list.map(({ author, date, text, type, typeId, _id, seen }) => {
        const { image } = author;

        return (
          <NotificationItem
            key={_id}
            id={_id}
            src={image}
            text={text}
            date={date}
            type={type}
            typeId={typeId}
            isSeen={seen}
          />
        );
      })}
      {list.length === 0 && (
        <StyledNonList>알림 목록이 없습니다.</StyledNonList>
      )}
    </StyledNotificationList>
  );
};

export default NotificationList;
