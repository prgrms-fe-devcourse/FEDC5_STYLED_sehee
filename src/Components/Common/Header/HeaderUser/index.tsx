import { useState } from 'react';
import { Link } from 'react-router-dom';
import AlarmModal from '../../Modal/AlarmModal';
import Button from '@/Components/Base/Button';
import Icon from '@/Components/Base/Icon';
import { StyledUserContainer } from '../style';
import Modal from '../../Modal';

const HeaderUser = () => {
  const [isUser, setUser] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const styledUserIcon = { fontSize: '4rem', padding: '1rem' };

  const userArr = [
    { name: 'notifications' },
    { name: 'send' },
    { name: 'account_circle' },
  ];

  return (
    <StyledUserContainer>
      {!isUser ? (
        <Button
          type="button"
          height="4rem"
          textSize="1.65rem"
          width="8rem"
          key={3}
          borderRadius="1rem"
          onClick={() => setUser(true)}
        >
          로그인
        </Button>
      ) : (
        userArr.map((items, index) => (
          <Button
            backgroundColor="transparent"
            width="fit-content"
            type="button"
            borderRadius="0"
            hoverBackgroundColor="transparent"
            key={Number(index) + 4}
            onClick={() => {
              switch (items.name) {
                case 'notifications':
                  setAlarm(true);
                  break;
                case 'account_circle':
                  setDropdown(true);
                  break;
                default:
                  break;
              }
            }}
          >
            {items.name === 'send' ? (
              <Link to="/directmessage">
                <Icon
                  name={items.name}
                  isFill={false}
                  style={styledUserIcon}
                />
              </Link>
            ) : (
              <Icon
                name={items.name}
                isFill={false}
                style={styledUserIcon}
              />
            )}
            {items.name === 'notifications'
              ? alarm && <AlarmModal onChangeOpen={() => setAlarm(false)} />
              : // 추후 수정 필요
                dropdown && <Modal onChangeOpen={() => setDropdown(false)} />}
          </Button>
        ))
      )}
    </StyledUserContainer>
  );
};

export default HeaderUser;
