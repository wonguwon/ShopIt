import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { userService } from '../api/users';
import useUserStore from '../store/userStore';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('유효한 이메일 주소를 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .required('비밀번호를 입력해주세요.'),
});

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await userService.login(data.email, data.password);
      if (response.length === 0) {
        throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
      }

      const user = response[0];

      // 로그인 성공 시 store에 사용자 정보 저장
      login(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        btoa(JSON.stringify({ id: user.id, email: user.email }))
      );

      toast.success('로그인에 성공했습니다!');
      navigate('/');
    } catch (error) {
      setError(error.message || '로그인에 실패했습니다.');
      toast.error(error.message || '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    error,
    onSubmit,
  };
};
