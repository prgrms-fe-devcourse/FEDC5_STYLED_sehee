import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import Alert from '@/Components/Common/Alert';
import useCheckAuth from '@/Hooks/Api/Auth';
import useFetchUser from '@/Hooks/Api/User';

const UpdateNameModal = ({ handleCloseModal, name }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { userId } = useParams() || '';
  const { loginUserRefetch } = useCheckAuth();
  const { userDataRefetch } = useFetchUser(userId || '');
  const [isValid, setIsValid] = useState(true);
  const [isError, setIsError] = useState(false);

  const { mutate, status } = useMutation({
    mutationFn: (nameData: PutUpdateUserRequestType) => updateMyName(nameData),
    onSuccess: (response) => {
      if (response) {
        handleCloseModal(false);
        loginUserRefetch();
        userDataRefetch();
      }
    },
    onError: () => {
      setIsError(true);
    },
  });

  const { values, errors, isLoading, handleOnChange, handleOnSubmit } =
    useForm<NameType>({
      initialState: { newName: '' },
      callback: (): void =>
        mutate({ fullName: values.newName, username: name }),
      validate: (newName) => validateName(newName),
    });

  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e);
    if (e.target.value.length) {
      setIsValid(false);
    }
    if (e.target.value.length === 0) {
      setIsValid(true);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Modal
      height={20}
      width={35}
      onChangeOpen={handleCloseModal}
    >
      <StyledContainer>
        {isLoading ? (
          <Spinner isFixedCenter />
        ) : (
          <StyledForm onSubmit={handleOnSubmit}>
            <Input
              ref={inputRef}
              onChange={onChangeHandle}
              type="text"
              name="newName"
              label="이름 변경"
              placeholder="변경할 이름을 입력해주세요"
              errorMessage={errors.newName}
              required
              wrapperProps={{ style: { padding: '1rem' } }}
            />
            <Button
              height="3rem"
              textSize="1.4rem"
              width="7rem"
              key="name"
              borderRadius="1rem"
              style={{ marginTop: '3rem' }}
              disabled={status === 'pending' || isValid}
            >
              변경
            </Button>
          </StyledForm>
        )}
        {isError && (
          <Alert
            message="사용자 이름 변경에 실패했습니다"
            onChangeOpen={() => {
              handleCloseModal(false);
            }}
          />
        )}
      </StyledContainer>
    </Modal>
  );
};

export default UpdateNameModal;
