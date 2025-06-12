import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  text-align: left;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.danger};
`;

const Input = React.forwardRef(({ 
  label, 
  error, 
  type = 'text',
  ...props 
}, ref) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <StyledInput
        ref={ref}
        type={type}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
});

Input.displayName = 'Input';

export { Input }; 