import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import useUserStore from '../store/userStore';
import { userService } from '../api/users';
import { FaSpinner } from 'react-icons/fa';
import {
  AuthContainer,
  Title,
  Form,
  InputGroup,
  Label,
  Input,
  ErrorMessage,
  Button,
} from '../styles/Auth.styles';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, updateUser, logout } = useUserStore();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(2, '사용자 이름은 2자 이상이어야 합니다.')
      .max(20, '사용자 이름은 20자 이하여야 합니다.')
      .required('사용자 이름을 입력해주세요.'),
    currentPassword: yup.string(),
    newPassword: yup
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        '비밀번호는 영문자와 숫자를 포함해야 합니다.'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], '비밀번호가 일치하지 않습니다.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user?.username || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // 비밀번호 변경이 있는 경우에만 비밀번호 관련 데이터 포함
      const updateData = {
        username: data.username,
        password: data.newPassword,
        updatedAt: new Date().toISOString(),
        // ...(data.newPassword && {
        //   currentPassword: data.currentPassword,
        //   newPassword: data.newPassword,
        // }),
      };

      await userService.updateProfile(user.id, updateData);
      updateUser(updateData);
      toast.success('회원정보가 수정되었습니다.');
      setIsEditing(false);
      reset(updateData);
    } catch (error) {
      toast.error(error.message || '회원정보 수정에 실패했습니다.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }

    try {
      setIsDeleting(true);
      await userService.deleteAccount(user.id);
      logout();
      toast.success('회원 탈퇴가 완료되었습니다.');
      navigate('/');
    } catch (error) {
      toast.error(error.message || '회원 탈퇴에 실패했습니다.');
      setIsDeleting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <AuthContainer>
      <Title>회원정보</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label htmlFor="username">사용자 이름</Label>
          <Input
            id="username"
            type="text"
            disabled={!isEditing}
            {...register('username')}
            $error={errors.username}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </InputGroup>

        <InputGroup>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" value={user.email} disabled />
        </InputGroup>

        {isEditing && (
          <>
            <InputGroup>
              <Label htmlFor="currentPassword">현재 비밀번호</Label>
              <Input id="currentPassword" type="password" {...register('currentPassword')} />
            </InputGroup>

            <InputGroup>
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                id="newPassword"
                type="password"
                {...register('newPassword')}
                $error={errors.newPassword}
              />
              {errors.newPassword && <ErrorMessage>{errors.newPassword.message}</ErrorMessage>}
            </InputGroup>

            <InputGroup>
              <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                $error={errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </InputGroup>
          </>
        )}

        <ButtonGroup>
          {isEditing ? (
            <>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <FaSpinner size={16} />
                    처리 중...
                  </>
                ) : (
                  '저장'
                )}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
                $secondary
              >
                취소
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setIsEditing(true)}>
              수정
            </Button>
          )}
        </ButtonGroup>
      </Form>

      <DeleteButton type="button" onClick={handleDeleteAccount} disabled={isDeleting} $danger>
        {isDeleting ? (
          <>
            <FaSpinner size={16} />
            처리 중...
          </>
        ) : (
          '회원 탈퇴'
        )}
      </DeleteButton>

      <LogoutButton type="button" onClick={() => {
        logout();
        toast.success('로그아웃되었습니다.');
        navigate('/login');
      }}>
        로그아웃
      </LogoutButton>
    </AuthContainer>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const DeleteButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
  }
`;

const LogoutButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[600]};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

export default Profile;
