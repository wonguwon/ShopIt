import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SignUpContainer = styled.div`
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing[12]} auto;
  padding: ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[800]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const Label = styled.label`
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.spacing[3]};
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.danger : theme.colors.gray[300]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors.gray[900]};
  background-color: ${({ theme }) => theme.colors.white};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;

export const Button = styled.button`
  padding: ${({ theme }) => theme.spacing[3.5]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[400]};
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const LoginLink = styled(Link)`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.spacing[5]};
  display: block;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }

  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;
