import { useTheme } from 'styled-components';
import { useRef, useEffect } from 'react';
import StyledForm from './style';
import SignUpButton from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';
import { useForm } from '@/Hooks';
import validateSignUp from './validateSignUp';

/**
 * PR point
 * 1. 폼 입력 좌측 정렬?
 * 2. 폼 gap?
 * 3. 세 가지 폼 전부 입력이 들어오기 전에는 회원가입 버튼 disabled?
 * 4. onChange 발생할 때마다 에러를 검사하고 레이블 옆에 출력?
 *
 * TODO 입력값 유효성 검사 및 중복 확인 -> 중복 확인 함수 utils 분리?
 * TODO API 바인딩
 * TODO React-query 연동
 */

const SignUpForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, size } = useTheme();
  const { values, errors, isLoading, handleOnChange, handleOnSubmit } = useForm(
    {
      initialState: { username: '', email: '', password: '' },
      callback: () => {},
      validate: () => {
        const { username, email, password } = values;

        if (
          typeof username === 'string' &&
          typeof email === 'string' &&
          typeof password === 'string'
        ) {
          return validateSignUp({ username, email, password });
        }

        return {};
      },
    },
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <Input
        ref={inputRef}
        type="username"
        name="username"
        label="이름"
        placeholder="이름"
        required
        errorMessage={errors.username}
        onChange={handleOnChange}
        style={{
          // textAlign: 'center',
          padding: size.large,
          fontSize: size.medium,
        }}
      />
      <Input
        type="email"
        name="email"
        label="이메일"
        placeholder="이메일"
        required
        errorMessage={errors.email}
        onChange={handleOnChange}
        style={{
          // textAlign: 'center',
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
          // textAlign: 'center',
          padding: size.large,
          fontSize: size.medium,
        }}
      />
      <SignUpButton
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
        회원가입
      </SignUpButton>
    </StyledForm>
  );
};

export default SignUpForm;
