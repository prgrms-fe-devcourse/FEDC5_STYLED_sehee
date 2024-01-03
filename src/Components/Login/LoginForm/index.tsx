import { useTheme } from 'styled-components';
import { useRef, useEffect } from 'react';
import StyledForm from './style';
import LoginButton from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';
import { useForm } from '@/Hooks';
import validateLogin from './validateLogin';

const LoginForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, size } = useTheme();
  const { values, errors, isLoading, handleOnChange, handleOnSubmit } = useForm(
    {
      initialState: { email: '', password: '' },
      callback: () => {},
      validate: () => {
        const { email, password } = values;

        if (typeof email === 'string' && typeof password === 'string') {
          return validateLogin({ email, password });
        }

        return {};
      },
    },
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

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
          textAlign: 'center',
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
          textAlign: 'center',
          padding: size.large,
          fontSize: size.medium,
        }}
      />
      <LoginButton
        width={size.full}
        textSize={size.large}
        textColor={colors.buttonText}
        backgroundColor={colors.buttonBackground}
        borderRadius={size.small}
        style={{
          padding: size.doubleLarge,
          marginTop: size.large,
        }}
      >
        로그인
      </LoginButton>
    </StyledForm>
  );
};

export default LoginForm;
