import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { userService } from '../api/users';

const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, '사용자 이름은 2자 이상이어야 합니다.')
    .max(20, '사용자 이름은 20자 이하여야 합니다.')
    .required('사용자 이름을 입력해주세요.'),
  email: yup
    .string()
    .email('유효한 이메일 주소를 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      '비밀번호는 영문자와 숫자를 포함해야 합니다.'
    )
    .required('비밀번호를 입력해주세요.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.')
});

export const useSignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    try {
      const isEmailDuplicate = await userService.checkEmailDuplicate(data.email);
      if (isEmailDuplicate) {
        toast.error('이미 사용 중인 이메일입니다.');
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.'
        });
        return;
      }

      await userService.signUp({
        username: data.username,
        email: data.email,
        password: data.password
      });

      toast.success('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
      console.error('회원가입 에러:', error);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    watch
  };
}; 