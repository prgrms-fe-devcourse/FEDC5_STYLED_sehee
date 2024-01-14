import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { PutUpdatePasswordRequestType } from '@/Types/Request';
import validatePassword from './validatePassword';
import { updateMyPassword } from '@/Services/Setting';
import useForm from '@/Hooks/UseForm';
import Button from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';
import Spinner from '@/Components/Base/Spinner';
import { StyledForm, StyledPasswordContainer } from './style';
import { Passwordtype, Props } from './type';

const PasswordForm = ({ onSuccessCallback }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputVerifyRef = useRef<HTMLInputElement>(null);

  const { mutate } = useMutation({
    mutationFn: ({ password }: PutUpdatePasswordRequestType) =>
      updateMyPassword(password),
    onSuccess: async (response) => {
      if (response) {
        onSuccessCallback(true);

        if (inputRef.current) {
          inputRef.current.value = '';
        }
        if (inputVerifyRef.current) {
          inputVerifyRef.current.value = '';
        }
      }
    },
  });

  const { values, errors, isLoading, handleOnChange, handleOnSubmit } =
    useForm<Passwordtype>({
      initialState: { newPassword: '', verifyPassword: '' },
      callback: (): void => mutate({ password: values.newPassword }),
      validate: (passwords) => validatePassword(passwords),
    });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <StyledPasswordContainer>
        <StyledForm onSubmit={handleOnSubmit}>
          <Input
            type="password"
            name="newPassword"
            label="비밀번호"
            placeholder="비밀번호"
            required
            ref={inputRef}
            errorMessage={errors.newPassword}
            onChange={handleOnChange}
            wrapperProps={{ style: { padding: '1rem' } }}
            style={{ width: '100%' }}
          />
          <Input
            type="password"
            name="verifyPassword"
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            required
            ref={inputVerifyRef}
            errorMessage={errors.verifyPassword}
            onChange={handleOnChange}
            wrapperProps={{ style: { padding: '1rem' } }}
            style={{ width: '100%' }}
          />
          <Button
            height="4rem"
            textSize="1.45rem"
            width="12rem"
            key="login"
            borderRadius="1rem"
            style={{ margin: '1rem' }}
          >
            비밀번호 변경
          </Button>
        </StyledForm>
      </StyledPasswordContainer>
    </>
  );
};

export default PasswordForm;
