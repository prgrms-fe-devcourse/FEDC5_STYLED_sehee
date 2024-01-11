/* eslint-disable no-underscore-dangle */
import { useMemo, useRef, useState } from 'react';
import { debounce } from 'lodash';
import Modal from '@/Components/Common/Modal';
import { StyledBody, StyledContainer, StyledHeader } from './style';
import Button from '@/Components/Base/Button';
import { UserType } from '@/Types/UserType';
import Input from '@/Components/Base/Input';
import { MessageModalProps } from './type';
import UserCard from '@/Components/Common/UserCard';
import DirectMessageSkeleton from '../Skeleton';
import { useSearchUsers } from '@/Hooks/Api/Message';

const MessageModal = ({
  setReceiver,
  onChangeOpen,
  setIsModalOpen,
  loginUser,
}: MessageModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selected, setSelected] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { users, isUsersLoading } = useSearchUsers(
    searchQuery,
    loginUser?._id || '',
  );

  // 디바운싱을 이용해 onChange 성능을 개선한다.
  const debouncedSearch = useMemo(
    () =>
      debounce(async () => {
        if (!inputRef || !inputRef.current) {
          return;
        }
        const query = inputRef.current.value.trim();
        setSearchQuery(query);
      }, 1000),
    [],
  );

  const handleInputChange = async () => {
    // @TODO 타자 치는 동안 스켈레톤 나오게 하는 방법 모색하기.
    setSelected(null);
    debouncedSearch();
  };

  const handleClickButton = async () => {
    if (!selected) {
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
        <Input
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="유저 이름으로 검색하세요."
        />
        <StyledBody>
          {(isUsersLoading || !users) && <DirectMessageSkeleton.UserCard />}
          {users?.length === 0 ? (
            <div>계정을 찾을 수 없습니다.</div>
          ) : (
            users?.map((user) => (
              <div key={user._id}>
                <UserCard
                  mode="radio"
                  coverImageUrl={user.image}
                  avatarSize={40}
                  userName={user.fullName}
                  userNameSize="1.5rem"
                  userDetail={user.email}
                  inputValue={user._id}
                  inputChecked={selected?._id === user._id}
                  onClick={() => setSelected(user)}
                  inputOnChange={() => setSelected(user)}
                />
              </div>
            ))
          )}
        </StyledBody>
        <Button
          height="3rem"
          width="60%"
          style={{ marginTop: '1rem' }}
          onClick={() => handleClickButton()}
          isActive={!selected}
          disabled={!selected}
        >
          채팅
        </Button>
      </StyledContainer>
    </Modal>
  );
};

export default MessageModal;
