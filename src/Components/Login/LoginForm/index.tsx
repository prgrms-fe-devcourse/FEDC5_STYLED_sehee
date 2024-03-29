import { useTheme } from 'styled-components';
import { useRef, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import StyledForm from './style';
import LoginButton from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';
import { useForm } from '@/Hooks';
import validateLogin from './validateLogin';
import { login } from '@/Services/Auth';
import { PostLoginRequestType } from '@/Types/Request';
import { Props } from './type';

const LoginForm = ({ onSuccessCallback, onErrorCallback }: Props) => {
  const { colors, size } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, status } = useMutation({
    mutationFn: (loginFormData: PostLoginRequestType) => login(loginFormData),
    onSuccess: (response) =>
      response ? onSuccessCallback(response) : onErrorCallback(),
  });

  const { values, errors, handleOnChange, handleOnSubmit } =
    useForm<PostLoginRequestType>({
      initialState: { email: '', password: '' },
      callback: (): void => mutate({ ...values }),
      validate: (formValues) => validateLogin(formValues),
    });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <Input
        ref={inputRef}
        type="email"
        name="email"
        label="이메일"
        placeholder="이메일"
        required
        errorMessage={errors.email}
        onChange={handleOnChange}
        style={{
          padding: size.large,
          fontSize: size.medium,
        }}
      />
      <Input
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호"
        required
        errorMessage={errors.password}
        onChange={handleOnChange}
        style={{
          padding: size.large,
          fontSize: size.medium,
        }}
      />
      <LoginButton
        width={size.full}
        textSize={size.large}
        textColor={colors.text}
        backgroundColor={colors.buttonBackground}
        borderRadius={size.small}
        disabled={status === 'pending'}
        hoverBackgroundColor={colors.buttonHoverBackground}
        hoverTextColor={colors.textReverse}
        style={{
          padding: size.doubleLarge,
          border: `0.1rem solid ${colors.text}`,
        }}
      >
        로그인
      </LoginButton>
    </StyledForm>
  );
};

export default LoginForm;
