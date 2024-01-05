import { useTheme } from 'styled-components';
import { useRef, useEffect, useState } from 'react';
import StyledForm from './style';
import SignUpButton from '@/Components/Base/Button';
import Input from '@/Components/Base/Input';
import { useForm } from '@/Hooks';
import validateSignUp from './validateSignUp';
import { signUp } from '@/Services/Auth';
import Alert from '@/Components/Common/Alert';
import Spinner from '@/Components/Base/Spinner';
import ValidateSignUpProps from './type';

// TODO API로직 React-query를 통한 리팩토링

const SignUpForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const { colors, size } = useTheme();
  const { values, errors, isLoading, handleOnChange, handleOnSubmit } = useForm(
    {
      initialState: { email: '', fullname: '', password: '' },
      callback: () => {
        // !ERROR: 'InitialState' 형식의 인수는 'ValidateSignUpProps' 형식의 매개 변수에 할당될 수 없습니다.
        handleSignUp(values);
      },
      validate: () => {
        const { email, fullname, password } = values;

        if (
          typeof email === 'string' &&
          typeof fullname === 'string' &&
          typeof password === 'string'
        ) {
          return validateSignUp({ email, fullname, password });
        }

        return {};
      },
    },
  );

  const handleSignUp = async (val: ValidateSignUpProps) => {
    const { email, fullname, password } = val;
    try {
      const data = await signUp({ email, fullName: fullname, password });

      if (!data) {
        setAlertMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        setShowAlert(true);
      } else {
        // TODO: 회원가입 성공 시 해당 value로 바로 로그인, 이후 메인 페이지로 이동
      }
    } catch (error) {
      // TODO: 받아오는 Error에 따른 Alert 처리
      // 현재는 API 내부에서 null을 반환하기 때문에 해당 조건을 기준으로 처리하였음
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      {isLoading && <Spinner />}
      <StyledForm onSubmit={handleOnSubmit}>
        <Input
          ref={inputRef}
          type="fullname"
          name="fullname"
          label="이름"
          placeholder="이름"
          required
          errorMessage={errors.fullname}
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
      {showAlert && (
        <Alert
          width={50}
          height={30}
          message={alertMessage}
          onChangeOpen={() => setShowAlert(false)}
          onConfirm={() => setShowAlert(false)}
          style={{ fontSize: '6rem' }}
        />
      )}
    </>
  );
};

export default SignUpForm;
