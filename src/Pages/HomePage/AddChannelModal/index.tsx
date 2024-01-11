import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import Modal from '@/Components/Common/Modal';
import { StyledAddChannelModalForm } from './style';
import Input from '@/Components/Base/Input';
import CreateChannelBtn from '@/Components/Base/Button';
import { createChannel } from '@/Services/Channel';

const AddChannelModal = () => {
  const { size } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [channelName, setChannelName] = useState('');
  const [channelDetail, setChannelDetail] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();

  /**
   * 모달 close 핸들러 함수
   * @param state Modal open state
   */
  const handleCloseModal = (state: boolean) => {
    setIsOpen(state);
    navigate('/');
  };

  /**
   * input 태그에 입력된 값으로 상태 업데이트하는 함수
   * @param e input 태그 value change event
   */
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { classList, value, checked } = e.target;

    if (classList.contains('channel-name')) {
      setChannelName(value.trim());
    }
    if (classList.contains('channel-detail')) setChannelDetail(value.trim());
    if (classList.contains('add-channel-checkbox')) setIsPublic(checked);
  };

  /**
   * 채널 생성 api useMutation 훅 (POST)
   *
   * @onSuccess 성공 시 모달 닫기
   */
  const { mutate } = useMutation({
    mutationFn: createChannel,
    onSuccess: () => handleCloseModal(false),
    // onMutate: async() => {

    // }
    // onSettled: () => {

    // }
  });

  /**
   * 채널 생성 버튼 클릭 시 mutate 실행하는 함수
   * @param e 채널 생성 버튼 클릭 이벤트
   */
  const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const reqBody = {
      authRequired: isPublic,
      description: channelDetail,
      name: channelName,
    };

    mutate(reqBody);
  };

  // 초기 렌더링 채널명 input 포커싱
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return isOpen ? (
    <Modal
      width={50}
      height={50}
      onChangeOpen={handleCloseModal}
    >
      <StyledAddChannelModalForm>
        <Input
          ref={inputRef}
          label="채널명"
          placeholder="채널명 입력..."
          errorMessage={!channelName ? '채널명을 입력해주세요.' : ''}
          onChange={handleOnChange}
          className="add-channel-input channel-name"
        />
        <Input
          label="채널 상세 설명"
          placeholder="채널에 대한 설명 입력..."
          onChange={handleOnChange}
          errorMessage={
            channelName && !channelDetail ? '채널에 대한 설명이 없습니다.' : ''
          }
          className="add-channel-input channel-detail"
        />
        <Input
          label="공개 여부"
          type="checkbox"
          disabled // 현재는 필요 없는 선택 요소라 disable 처리함
          onChange={handleOnChange}
          className="add-channel-checkbox"
        />
        <CreateChannelBtn
          disabled={!channelName || !channelDetail}
          width={size.half}
          height={size.doubleLarge}
          textSize={size.medium}
          className="create-channel-btn"
          onClick={handleOnSubmit}
        >
          채널 생성
        </CreateChannelBtn>
      </StyledAddChannelModalForm>
    </Modal>
  ) : null;
};

export default AddChannelModal;
