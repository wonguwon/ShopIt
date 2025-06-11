import styled from 'styled-components';
import { Button } from './Auth.styles';

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

export const DeleteButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[6]};
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.errorDark};
  }
`;

export const LogoutButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.gray[600]};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[700]};
  }
`; 