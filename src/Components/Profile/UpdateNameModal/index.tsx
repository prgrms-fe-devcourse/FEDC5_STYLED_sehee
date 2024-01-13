import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import Button from '@/Components/Base/Button';
import Modal from '@/Components/Common/Modal';
import Spinner from '@/Components/Base/Spinner';
import Input from '@/Components/Base/Input';
import { updateMyName } from '@/Services/Setting';
import { PutUpdateUserRequestType } from '@/Types/Request';
import { useForm } from '@/Hooks';
import { NameType, Props } from './type';
import validateName from './validateName';
import { StyledContainer, StyledForm } from './style';

const UpdateNameModal = ({ handleCloseModal, name }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, status } = useMutation({
    mutationFn: (nameData: PutUpdateUserRequestType) => updateMyName(nameData),
    onSuccess: async (response) => {
      if (response) {
        handleCloseModal(false);
      }
    },
  });

  const { values, errors, isLoading, handleOnChange, handleOnSubmit } =
    useForm<NameType>({
      initialState: { username: '' },
      callback: (): void =>
        mutate({ fullName: name, username: values.username }),
      validate: (username) => validateName(username),
    });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal
      height={30}
      width={30}
      onChangeOpen={handleCloseModal}
    >
      <StyledContainer>
        {isLoading ? (
          <Spinner isFixedCenter />
        ) : (
          <StyledForm onSubmit={handleOnSubmit}>
            <Input
              ref={inputRef}
              onChange={handleOnChange}
              type="text"
              name="username"
              label="이름 변경"
              placeholder="변경할 이름을 입력해주세요"
              errorMessage={errors.username}
              required
              wrapperProps={{ style: { padding: '1rem' } }}
            />
            <Button
              type="button"
              height="3rem"
              textSize="1.4rem"
              width="7rem"
              borderRadius="1rem"
              style={{ marginTop: '3rem' }}
              disabled={status === 'pending'}
            >
              제출
            </Button>
          </StyledForm>
        )}
      </StyledContainer>
    </Modal>
  );
};

export default UpdateNameModal;
