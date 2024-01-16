/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { useTheme } from 'styled-components';
import Modal from '@/Components/Common/Modal';
import { StyledBody, StyledContainer, StyledHeader } from './style';
import Button from '@/Components/Base/Button';
import { UserType } from '@/Types/UserType';
import Input from '@/Components/Base/Input';
import { MessageModalProps } from './type';
import UserCard from '@/Components/Common/UserCard';
import DirectMessageSkeleton from '../Skeleton';
import { useSearchUsers } from '@/Hooks/Api/Search';
import useDebouncedSearch from '@/Hooks/useDebouncedSearch';
import useMessageReceiver from '@/Stores/MessageReceiver';
import useIsTyping from '@/Hooks/useIsTyping';

const MessageModal = ({
  setIsModalOpen,
  loginUser,
  isMobileSize = false,
}: MessageModalProps) => {
  const { colors } = useTheme();
  const { inputRef, isTyping } = useIsTyping();

  const [selected, setSelected] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { users, isUsersLoading } = useSearchUsers(
    searchQuery,
    loginUser?._id || '',
  );

  const { setReceiver, setIsClickedUserCard } = useMessageReceiver();

  // 디바운싱을 이용해 onChange 성능을 개선한다.
  const debouncedSearch = useDebouncedSearch({
    inputRef,
    callback: setSearchQuery,
  });

  const handleInputChange = () => {
    setSelected(null);
    debouncedSearch();
  };

  const handleClickButton = () => {
    if (!selected) {
      return;
    }
    setReceiver(selected);
    setIsClickedUserCard(true);
    setIsModalOpen(false);
  };

  return (
    <Modal
      onChangeOpen={setIsModalOpen}
      height={60}
      width={isMobileSize ? 70 : 40}
    >
      <StyledContainer>
        <StyledHeader>새로운 메시지</StyledHeader>
        <Input
          ref={inputRef}
          onChange={handleInputChange}
          placeholder="유저 이름으로 검색하세요."
        />
        <StyledBody>
          {(isTyping || isUsersLoading || !users) && (
            <DirectMessageSkeleton.UserCard />
          )}
          {users?.length === 0 ? (
            <div>계정을 찾을 수 없습니다.</div>
          ) : (
            users?.map((user) => (
              <UserCard
                key={user._id}
                mode="radio"
                height="auto"
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
            ))
          )}
        </StyledBody>
        <Button
          height="3rem"
          width="60%"
          style={{
            marginRight: '1rem',
            marginTop: '.5rem',
            border: `1px solid ${colors.text}`,
          }}
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
