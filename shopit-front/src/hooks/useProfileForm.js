import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { userService } from '../api/users';
import useUserStore from '../store/userStore';

const profileSchema = yup.object().shape({
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

export const useProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { user, updateUser, logout } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: user?.username || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const updateData = {
        username: data.username,
        password: data.newPassword,
        updatedAt: new Date().toISOString(),
      };

      await userService.updateProfile(user.email, updateData);
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
      await userService.deleteAccount(user.email);
      logout();
      toast.success('회원 탈퇴가 완료되었습니다.');
      return true;
    } catch (error) {
      toast.error(error.message || '회원 탈퇴에 실패했습니다.');
      setIsDeleting(false);
      return false;
    }
  };

  return {
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
  };
}; 