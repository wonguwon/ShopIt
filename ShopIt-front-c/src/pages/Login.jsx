import React from 'react';
import { Link } from 'react-router-dom';
import { useLoginForm } from '../hooks/useLoginForm';
import {
  LoginContainer,
  LoginForm,
  Title,
  Input,
  Button,
  SignUpLink,
  ErrorMessage,
} from '../styles/Login.styles';

const Login = () => {
  const { register, handleSubmit, errors, isLoading, error, onSubmit } = useLoginForm();

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          type="email"
          placeholder="이메일"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>

        <SignUpLink>
          계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </SignUpLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
