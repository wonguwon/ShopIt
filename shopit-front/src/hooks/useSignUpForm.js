import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { userService } from '../api/users';

// 회원가입 폼의 유효성 검사 스키마 정의
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
    .required('비밀번호 확인을 입력해주세요.'),
});

// 회원가입 폼 로직을 캡슐화한 커스텀 훅
export const useSignUpForm = () => {
  const navigate = useNavigate(); // 페이지 이동 함수 가져오기

  // react-hook-form 훅으로 폼 상태 초기화 및 유효성 연결
  const {
    register, // 각 input을 RHF에 등록하기 위한 함수
    handleSubmit, // 제출 핸들러 생성 함수
    formState: { errors, isSubmitting }, // 유효성 에러 및 제출 중 상태
    setError, // 특정 필드에 수동으로 에러 메시지 설정
    watch, // 입력 값 실시간 감시 (선택적)
  } = useForm({
    resolver: yupResolver(signUpSchema), // yup 스키마와 연결
    mode: 'onChange', // 입력 중에도 실시간 유효성 검사
  });

  // 실제 제출 시 실행되는 함수
  const onSubmit = async (data) => {
    try {
      // 이메일 중복 체크 (DB에 같은 이메일이 있는지 확인)
      const isEmailDuplicate = await userService.checkEmailDuplicate(data.email);

      if (isEmailDuplicate) {
        toast.error('이미 사용 중인 이메일입니다.');
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.',
        });
        return;
      }

      // 중복이 아니면 회원가입 API 호출
      await userService.signUp({
        username: data.username,
        email: data.email,
        password: data.password,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      // 성공 알림 후 로그인 페이지로 이동
      toast.success('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      toast.error('회원가입 중 오류가 발생했습니다.');
      console.error('회원가입 에러:', error);
    }
  };

  // 컴포넌트에서 사용할 값들 반환
  return {
    register, // 각 input 요소에 연결
    handleSubmit: handleSubmit(onSubmit), // form의 onSubmit에 연결
    errors, // 각 필드별 에러 메시지 저장
    isSubmitting, // 제출 중 여부 (중복 클릭 방지 등)
    watch, // 입력 값 실시간 감시 (옵션)
  };
};
