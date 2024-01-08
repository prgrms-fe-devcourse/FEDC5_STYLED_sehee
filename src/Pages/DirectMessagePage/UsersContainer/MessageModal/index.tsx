/* eslint-disable no-underscore-dangle */
import { useRef, useState } from 'react';
import Modal from '@/Components/Common/Modal';
import SearchBar from '@/Components/Common/SearchBar';
import {
  StyledBody,
  StyledContainer,
  StyledHeader,
  StyledUserItemContainer,
} from './style';
import Button from '@/Components/Base/Button';
import { searchUsers } from '@/Services/Search';
import { UserType } from '@/Types/UserType';
import { myId } from '../../DUMMY_DATA';
import UserItem from '../UserItem';
import Input from '@/Components/Base/Input';
import { MessageModalProps } from './type';
import Alert from '@/Components/Common/Alert';

const MessageModal = ({
  setReceiver,
  onChangeOpen,
  setIsModalOpen,
}: MessageModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [selected, setSelected] = useState<UserType | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  /**
   * @todo 디바운스를 이용한 성능 개선 고려
   */
  const onChangehandler = async () => {
    if (!inputRef || !inputRef.current) {
      return;
    }
    const query = inputRef.current.value.trim();
    // 검색어가 비어있다면 API함수를 호출하지 않는다.
    if (query.length === 0) {
      setUsers([]);
      return;
    }
    const data = await searchUsers(query);
    if (data != null) {
      // 본인은 제외 한다.
      const newData = data.filter((user) => user._id !== myId);
      setUsers(newData);
    }
  };

  const handleClickButton = async () => {
    if (!selected) {
      setIsAlertOpen(true);
      // 선택한 유저가 없습니다.
      return;
    }
    setReceiver(selected);
    setIsModalOpen(false);
  };

  return (
    <Modal
      onChangeOpen={onChangeOpen}
      height={60}
      width={40}
    >
      <StyledContainer>
        <StyledHeader>새로운 메시지</StyledHeader>
        {/* 여기서부터 */}
        <SearchBar
          style={{ paddingBottom: '1rem', maxWidth: '80%' }}
          inputProps={{ ref: inputRef }}
          onChangehandler={onChangehandler}
          // @TODO: onSubmithandler는 선택으로 변경 할 것, submit되면 새로고침 방지되도록 해야 합니다.
        />
        <StyledBody>
          {users.map((user) => (
            <StyledUserItemContainer
              key={user._id}
              onClick={() => setSelected(user)}
            >
              <UserItem
                userName={user.fullName}
                body={user.email}
              />
              <Input
                type="radio"
                value={user._id}
                checked={selected?._id === user._id}
                onChange={() => setSelected(user)}
              />
            </StyledUserItemContainer>
          ))}
        </StyledBody>
        {/* 여기까지 */}
        <Button
          height="3rem"
          width="60%"
          style={{ marginTop: '1rem' }}
          onClick={() => handleClickButton()}
        >
          채팅
        </Button>
      </StyledContainer>
      {isAlertOpen ? (
        <Alert
          message="선택한 유저가 없습니다."
          onChangeOpen={setIsAlertOpen}
        />
      ) : undefined}
    </Modal>
  );
};

export default MessageModal;
