import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { PutUpdatePasswordRequestType } from '@/Types/Request';
import validatePassword from './validatePassword';
import ERROR_MESSAGES from '@/Constants/Message';
import { updateMyPassword } from '@/Services/Setting';
import useForm from '@/Hooks/UseForm';
import Button from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';
import Spinner from '@/Components/Base/Spinner';

interface Props {
  onErrorCallback: (message: string) => void;
}

interface Ptype {
  newPassword: string;
  verifyPassword: string;
}

const PasswordForm = ({ onErrorCallback }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate } = useMutation({
    mutationFn: ({ password }: PutUpdatePasswordRequestType) =>
      updateMyPassword(password),
    onSuccess: async (response) => {
      setIsSuccess(response);
    },
    onError: () => onErrorCallback(ERROR_MESSAGES.UPDATE_PASSWORD),
  });

  const { values, errors, isLoading, handleOnChange, handleOnSubmit } =
    useForm<Ptype>({
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
      <form onSubmit={handleOnSubmit}>
        <Input
          type="password"
          name="newPassword"
          label="비밀번호"
          placeholder="비밀번호"
          required
          errorMessage={errors.newPassword}
          onChange={handleOnChange}
        />
        <Input
          type="password"
          name="verifyPassword"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          required
          errorMessage={errors.verifyPassword}
          onChange={handleOnChange}
        />
        <Button
          height="4rem"
          textSize="1.45rem"
          width="12rem"
          key="login"
          borderRadius="1rem"
          style={{ marginRight: '1rem' }}
        >
          비밀번호 변경
        </Button>
      </form>
      {isSuccess && <div>good</div>}
    </>
  );
};

export default PasswordForm;
