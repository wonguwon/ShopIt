import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useUserStore from '../store/userStore';
import { useProfileForm } from '../hooks/useProfileForm';
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
import {
  ButtonGroup,
  DeleteButton,
  LogoutButton,
} from '../styles/Profile.styles';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const {
    isEditing,
    setIsEditing,
    isDeleting,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    reset,
    onSubmit,
    handleDeleteAccount,
  } = useProfileForm();

  const handleLogout = () => {
    logout();
    toast.success('로그아웃되었습니다.');
    navigate('/login');
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

      <DeleteButton
        type="button"
        onClick={async () => {
          const success = await handleDeleteAccount();
          if (success) {
            navigate('/');
          }
        }}
        disabled={isDeleting}
        $danger
      >
        {isDeleting ? (
          <>
            <FaSpinner size={16} />
            처리 중...
          </>
        ) : (
          '회원 탈퇴'
        )}
      </DeleteButton>

      <LogoutButton type="button" onClick={handleLogout}>
        로그아웃
      </LogoutButton>
    </AuthContainer>
  );
};

export default Profile;
