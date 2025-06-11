import styled, { css } from 'styled-components';

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  ${buttonStyles}
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}dd;
  }
`;

export const OutlineButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}11;
  }
`;

export const TextButton = styled(Button)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}11;
  }
`;

export const FullWidthIconButton = styled(Button)`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid ${({ theme, variant }) => 
    variant === 'danger' ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: 4px;
  background-color: ${({ theme, variant }) => 
    variant === 'danger' ? theme.colors.danger : theme.colors.white};
  color: ${({ theme, variant }) => 
    variant === 'danger' ? theme.colors.white : theme.colors.gray[600]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, variant }) => 
      variant === 'danger' ? theme.colors.danger + 'dd' : theme.colors.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 