import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaPaperclip, FaTimes } from 'react-icons/fa';

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background-color: ${props => props.theme.colors.gray[100]};
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => !props.disabled && props.theme.colors.gray[200]};
  }
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: ${props => props.theme.colors.gray[50]};
  border-radius: 4px;
  font-size: 14px;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[500]};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: color 0.2s;

  &:hover {
    color: ${props => !props.disabled && props.theme.colors.danger};
  }
`;

const FileUpload = ({ files, onChange, onRemove, disabled }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (disabled) return;
    const newFiles = Array.from(e.target.files);
    onChange([...files, ...newFiles]);
    e.target.value = null;
  };

  const handleRemoveFile = (index) => {
    if (disabled) return;
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  return (
    <FileUploadContainer>
      <FileInputWrapper>
        <FileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          disabled={disabled}
        />
        <FileInputLabel 
          onClick={() => !disabled && fileInputRef.current?.click()}
          disabled={disabled}
        >
          <FaPaperclip />
          파일 첨부
        </FileInputLabel>
      </FileInputWrapper>
      {files.length > 0 && (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <span>{file.name}</span>
              <RemoveButton 
                onClick={() => handleRemoveFile(index)}
                disabled={disabled}
              >
                <FaTimes />
              </RemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
    </FileUploadContainer>
  );
};

export { FileUpload }; 